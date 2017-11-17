import axios from 'axios';

import Table from './table';
import Module from '../objects/module';

// Private methods
const addEmpty = Symbol('Add an empty module into the database');
const check = Symbol('Check if a database module needs to be updated');
const update = Symbol('Update a module');

class ModulesTable extends Table {
  constructor(database, properties) {
    super(database, 'modules', 'name, sha, content, properties, style');

    this.repositoryURL = properties.repositoryURL;
    this.modulesPath = properties.modulesPath;
    this.filesPaths = properties.filesPaths;
  }

  fill() {
    // Query to the GitHub API to get the list of modules
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.repositoryURL}/${this.modulesPath}`)
        .then((res) => {
          res.data.forEach((module) => {
            this.table
              .get({ name: module.name }, (databaseModule) => {
                const { name } = module;
                const { sha } = module;
                this[check](databaseModule, name, sha)
                  .then((needUpdate) => {
                    if (needUpdate) {
                      this[update](name, sha)
                        .then(() => resolve())
                        .catch(error => reject(error));
                    } else {
                      resolve();
                    }
                  })
                  .catch(error => reject(error));
              });
          });
        })
        .catch(error => reject(error));
    });
  }

  getAll() {
    return new Promise((resolve, reject) => {
      this.table
        .toArray()
        .then((databaseModules) => {
          const modules = databaseModules.map(module =>
            new Module(
              module.name,
              module.sha,
              module.content,
              module.properties,
              module.style,
            ));

          resolve(modules);
        })
        .catch(error => reject(error));
    });
  }

  [addEmpty](name) {
    return this.table
      .put({
        name,
        sha: null,
        content: null,
        properties: null,
        style: null,
      });
  }

  [check](databaseModule, name, sha) {
    return new Promise((resolve, reject) => {
      if (typeof databaseModule === 'undefined') {
        this[addEmpty](name)
          .then(() => {
            resolve(true);
          })
          .catch(error => reject(error));
      } else if (databaseModule.sha !== sha) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }

  [update](name, sha) {
    // Retrieve JSON schema files
    const headers = { headers: { Accept: 'application/vnd.github.VERSION.raw' } };

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
