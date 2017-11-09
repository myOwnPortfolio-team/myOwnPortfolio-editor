import Dexie from 'dexie';
import axios from 'axios';

const db = new Dexie('MyOwnPortfolioDB');
db.version(1).stores({
  modules: 'name, sha, content, properties, style',
});

function addModule(name) {
  db.table('modules')
    .put({
      name,
      sha: null,
      content: null,
      properties: null,
      style: null,
    });
}

function updateModule(updateCallback, dbModule, name, sha) {
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
        `https://api.github.com/repos/myOwnPortfolio-team/myOwnPortfolio-core/contents/app/modules/${name}/json_schema/content.json`,
        headers,
      ),
      axios.get(
        `https://api.github.com/repos/myOwnPortfolio-team/myOwnPortfolio-core/contents/app/modules/${name}/json_schema/properties.json`,
        headers,
      ),
      axios.get(
        `https://api.github.com/repos/myOwnPortfolio-team/myOwnPortfolio-core/contents/app/modules/${name}/json_schema/style.json`,
        headers,
      ),
    ]).then(axios.spread((content, properties, style) =>
      db.table('modules')
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
}

function checkModules(updateCallback) {
  // Query to the GitHub API to get the list of modules
  axios.get('https://api.github.com/repos/myOwnPortfolio-team/myOwnPortfolio-core/contents/app/modules')
    .then((res) => {
      res.data.forEach((module) => {
        db.modules
          .get({ name: module.name }, (dbModule) => {
            const { name } = module;
            const { sha } = module;
            updateModule(updateCallback, dbModule, name, sha);
          });
      });
    });
}

module.exports = {
  database: db,
  checkModules,
};
