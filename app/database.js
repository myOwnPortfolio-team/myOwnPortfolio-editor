import Dexie from 'dexie';
import axios from 'axios';

const PROPERTIES = require('./config/app_properties');

const DB = new Dexie('MyOwnPortfolioDB');
DB.version(1).stores({
  modules: 'name, sha, content, properties, style',
});

const addModule = (name) => {
  DB.table('modules')
    .put({
      name,
      sha: null,
      content: null,
      properties: null,
      style: null,
    });
};

const updateModule = (updateCallback, dbModule, name, sha) => {
  let needUpdate = false;
  let headers;

  if (typeof dbModule === 'undefined') {
    addModule(name);
    needUpdate = true;
  } else if (dbModule.sha !== sha) {
    needUpdate = true;
  }

  if (needUpdate) {
    // Retrieve JSON schema files
    headers = { headers: { Accept: 'application/vnd.github.VERSION.raw' } };

    axios.all([
      axios.get(
        `${PROPERTIES.repositoryURL}/${PROPERTIES.filesPaths[0].replace('$moduleName', name)}`,
        headers,
      ),
      axios.get(
        `${PROPERTIES.repositoryURL}/${PROPERTIES.filesPaths[1].replace('$moduleName', name)}`,
        headers,
      ),
      axios.get(
        `${PROPERTIES.repositoryURL}/${PROPERTIES.filesPaths[2].replace('$moduleName', name)}`,
        headers,
      ),
    ]).then(axios.spread((content, properties, style) =>
      DB.table('modules')
        .update(
          { name },
          {
            sha,
            content: content.data,
            properties: properties.data,
            style: style.data,
          },
        )))
      .then(() => updateCallback());
  }
};

const checkModules = (updateCallback) => {
  // Query to the GitHub API to get the list of modules
  axios.get(`${PROPERTIES.repositoryURL}/${PROPERTIES.modulesPath}`)
    .then((res) => {
      res.data.forEach((module) => {
        DB.modules
          .get({ name: module.name }, (dbModule) => {
            const { name } = module;
            const { sha } = module;
            updateModule(updateCallback, dbModule, name, sha);
          });
      });
    });
};

module.exports = {
  database: DB,
  checkModules,
};
