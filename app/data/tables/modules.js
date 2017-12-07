import axios from 'axios';

import Table from './table';
import Module from '../objects/module';
import WebSocketClient from '../../auth/websocket';

// Private methods
const getRepositoryModules = Symbol('Get modules from repository');
const getDatabaseModules = Symbol('Get modules from database');
const addEmptyModule = Symbol('Add an empty module into the database');
const updateDatabaseModule = Symbol('Update a module');
const updateDatabaseModules = Symbol('Update modules');
const addModulesInDatabase = Symbol('Add in the database every missing modules');
const clearDatabase = Symbol('Remove outdated modules.');

class ModulesTable extends Table {
  constructor(database, properties) {
    super(database, 'modules', 'name, sha, content, properties, style');

    /* this.githubToken = properties.githubToken; */
    this.repositoryURL = properties.repositoryURL;
    this.modulesPath = properties.modulesPath;
    this.filesPaths = properties.filesPaths;

    this.serverHost = properties.serverHost;
    this.serverPort = properties.serverPort;
  }

  fill() {
    // Get Github Token
    const accessTokenPromise = new Promise((resolve, reject) => {
      const socket = new WebSocketClient(this.serverHost, this.serverPort);
      socket
        .getAuthLink()
        .then((link) => {
          console.log(link);
        })
        .catch(error => reject(error));

      socket
        .getAccessToken()
        .then((token) => {
          process.env.MOP_ACCESS_TOKEN = token;
          resolve(token);
        })
        .catch(error => reject(error));
    });

    // Remove modules that are no longer used
    const clearDatabasePromise = this[clearDatabase](
      this[getRepositoryModules](accessTokenPromise),
      this[getDatabaseModules](),
    );

    const addModulesInDatabasePromise = this[addModulesInDatabase](
      this[getRepositoryModules](accessTokenPromise),
      this[getDatabaseModules](),
    );

    const updateDatabaseModulesPromise = this[updateDatabaseModules](
      addModulesInDatabasePromise,
      this[getRepositoryModules](accessTokenPromise),
      this[getDatabaseModules](),
    );

    return Promise.all([
      clearDatabasePromise,
      updateDatabaseModulesPromise,
    ]).catch(() => null);
  }

  getAll() {
    return this.table
      .toArray()
      .then(databaseModules =>
        databaseModules
          .map(databaseModule =>
            new Module(
              databaseModule.name,
              databaseModule.sha,
              databaseModule.content,
              databaseModule.properties,
              databaseModule.style,
            )));
  }

  [getRepositoryModules](accessTokenPromise) {
    return new Promise((resolve, reject) => {
      accessTokenPromise
        .then((token) => {
          const headers = {
            headers: {
              Authorization: `token ${token}`,
            },
          };

          axios
            .get(`${this.repositoryURL}/${this.modulesPath}`, headers)
            .then(res => resolve(res.data))
            .catch(error => reject(error));
        })
        .catch(() => {
          // Try to get without token
          axios
            .get(`${this.repositoryURL}/${this.modulesPath}`)
            .then(res => resolve(res.data))
            .catch(error => reject(error));
        });
    });
  }

  [getDatabaseModules]() {
    return this.table.toArray();
  }

  [clearDatabase](repositoryModulesPromise, databaseModulesPromise) {
    return Promise
      .all([
        repositoryModulesPromise,
        databaseModulesPromise,
      ]).then((res) => {
        const repositoryModules = res[0];
        const databaseModules = res[1];

        return Promise.all(databaseModules
          .map((databaseModule) => {
            if (repositoryModules.map(repositoryModule => repositoryModule.name)
              .indexOf(databaseModule.name) < 0) {
              return this.table.delete(databaseModule.name);
            }

            return null;
          }));
      });
  }

  [addModulesInDatabase](repositoryModulesPromise, databaseModulesPromise) {
    return Promise
      .all([
        repositoryModulesPromise,
        databaseModulesPromise,
      ]).then((res) => {
        const repositoryModules = res[0];
        const databaseModules = res[1];

        return Promise.all(repositoryModules
          .map((repositoryModule) => {
            let moduleInDatabase;
            if (databaseModules.map(databaseModule => databaseModule.name)
              .indexOf(repositoryModule.name) < 0) {
              moduleInDatabase = this[addEmptyModule](repositoryModule.name);
            } else {
              moduleInDatabase = null;
            }
            return moduleInDatabase;
          }));
      });
  }

  [addEmptyModule](name) {
    return this.table
      .put({
        name,
        sha: null,
        content: null,
        properties: null,
        style: null,
      });
  }

  [updateDatabaseModules](promise, repositoryModulesPromise, databaseModulesPromise) {
    return promise
      .then(() =>
        Promise.all([
          repositoryModulesPromise,
          databaseModulesPromise,
        ]))
      .then((res) => {
        const repositoryModules = res[0];
        const databaseModules = res[1];
        const databaseModulesSha = [];
        databaseModules
          .map((databaseModule) => {
            databaseModulesSha[databaseModule.name] = databaseModule.sha;
            return databaseModule.name;
          });

        return Promise.all(repositoryModules.map(((repositoryModule) => {
          let updatePromise;
          if (repositoryModule.sha !== databaseModulesSha[repositoryModule.name]) {
            updatePromise = this[updateDatabaseModule](repositoryModule.name, repositoryModule.sha);
          } else {
            updatePromise = null;
          }

          return updatePromise;
        })));
      });
  }

  [updateDatabaseModule](name, sha) {
    // Retrieve JSON schema files
    const headers = {
      headers: {
        /* Authorization: 'token GITHUB_TOKEN', */
        Accept: 'application/vnd.github.VERSION.raw',
      },
    };

    let updatePromise = axios.all([
      axios.get(
        `${this.repositoryURL}/${this.filesPaths[0].replace('$moduleName', name)}`,
        headers,
      ),
      axios.get(
        `${this.repositoryURL}/${this.filesPaths[1].replace('$moduleName', name)}`,
        headers,
      ),
      axios.get(
        `${this.repositoryURL}/${this.filesPaths[2].replace('$moduleName', name)}`,
        headers,
      ),
    ]);

    updatePromise = updatePromise
      .then(axios.spread((content, properties, style) =>
        this.table
          .update(
            { name },
            {
              sha,
              content: content.data,
              properties: properties.data,
              style: style.data,
            },
          )));

    return updatePromise;
  }
}

module.exports = ModulesTable;
