import axios from 'axios';

import Table from './table';

const getAppPropertiesSchema = Symbol('Get app properties from repository');

class KVTable extends Table {
  constructor(database, properties) {
    super(database, 'kv-store', 'key, value');

    this.repositoryURL = properties.repositoryURL;
    this.appPropertiesPath = properties.appPropertiesPath;
  }

  set(key, value) {
    return this.table.put({ key, value });
  }

  get(key) {
    return this.table
      .get({ key })
      .then((object) => {
        if (object) {
          return object.value;
        }
        return undefined;
      });
  }

  fill(accessToken) {
    return this[getAppPropertiesSchema](accessToken)
      .then((appPropertiesSchema) => {
        if (appPropertiesSchema) {
          this.set('appPropertiesSchema', appPropertiesSchema);
        }

        // Retrieve user id
        return axios
          .get('https://api.github.com/user', {
            headers: {
              'Content-Type': 'text/json',
              Authorization: `token ${accessToken}`,
            },
          });
      })
      .then(res => this.set('userID', res.data.id));
  }

  [getAppPropertiesSchema](accessToken) {
    return new Promise((resolve, reject) => {
      const headers = {
        Accept: 'application/vnd.github.VERSION.object',
      };

      if (accessToken) {
        headers.Authorization = `token ${accessToken}`;
      }

      axios({
        url: `${this.repositoryURL}/${this.appPropertiesPath}`,
        method: 'get',
        headers,
      })
        .then((res) => {
          if (res.data.download_url) {
            return axios({
              url: res.data.download_url,
              method: 'get',
            });
          }
          return res;
        })
        .then(res => resolve(res.data));
    });
  }
}

module.exports = KVTable;
