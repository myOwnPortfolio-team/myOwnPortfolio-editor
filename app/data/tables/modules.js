import axios from 'axios';

import Table from './table';
import Module from '../objects/module';

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

    this.repositoryURL = properties.repositoryURL;
    this.modulesPath = properties.modulesPath;
    this.filesPaths = properties.filesPaths;
  }

  fill(accessToken = undefined) {
    // Remove modules that are no longer used
    const clearDatabasePromise = this[clearDatabase](
      this[getRepositoryModules](accessToken),
      this[getDatabaseModules](),
    );

    const addModulesInDatabasePromise = this[addModulesInDatabase](
      this[getRepositoryModules](accessToken),
      this[getDatabaseModules](),
    );

    const updateDatabaseModulesPromise = this[updateDatabaseModules](
      addModulesInDatabasePromise,
      this[getRepositoryModules](accessToken),
      this[getDatabaseModules](),
      accessToken,
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

  [getRepositoryModules](accessToken) {
    return new Promise((resolve, reject) => {
      let headers;
      if (accessToken !== undefined) {
        headers = {
          headers: {
            Authorization: `token ${accessToken}`,
          },
        };
      } else {
        headers = {
          headers: {},
        };
      }

      axios
        .get(`${this.repositoryURL}/${this.modulesPath}`, headers)
        .then(res => resolve(res.data))
        .catch(error => reject(error));
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

  [updateDatabaseModules](promise, repositoryModulesPromise, databaseModulesPromise, accessToken) {
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
            console.log('update', repositoryModule.name);
            updatePromise = this[updateDatabaseModule](
              repositoryModule.name,
              repositoryModule.sha,
              accessToken,
            );
          } else {
            updatePromise = null;
          }

          return updatePromise;
        })));
      });
  }

  [updateDatabaseModule](name, sha, accessToken) {
    // Retrieve JSON schema files
    const headers = {
      headers: {
        Accept: 'application/vnd.github.VERSION.raw',
      },
    };

    if (accessToken) {
      headers.headers.Authorization = `token ${accessToken}`;
    }

    return axios.all([
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
    ])
      // .then(axios.spread((content, properties, style) =>
      //   axios.all([
      //     axios({
      //       url: content.data.download_url,
      //       method: 'get',
      //     }),
      //     axios({
      //       url: properties.data.download_url,
      //       method: 'get',
      //     }),
      //     axios({
      //       url: style.data.download_url,
      //       method: 'get',
      //     }),
      //   ])))
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
  }
}

module.exports = ModulesTable;

