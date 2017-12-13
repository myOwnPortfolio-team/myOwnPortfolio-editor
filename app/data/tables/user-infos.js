import axios from 'axios';

import Table from './table';
import UserInfos from '../objects/user-infos';

class UserInfosTable extends Table {
  constructor(database, properties) {
    super(database, 'userInfos', 'id, username, accessToken, scopes, avatarURL');

    this.serverHost = properties.serverHost;
    this.serverPort = properties.serverPort;
    this.githubAPI = properties.githubAPI;
  }

  userExists() {
    return this.table
      .get(1)
      .then(user => user !== undefined);
  }

  getUserInfos() {
    return this.table
      .get(1)
      .then(infos =>
        new UserInfos(
          infos.username,
          infos.accessToken,
          infos.scopes,
          infos.avatarURL,
        ));
  }

  removeUser() {
    // TODO Revoke access token (Request to My Own Portfolio server)
    return this.userExists()
      .then(() => this.getUserInfos()
        .then(user =>
          Promise.all([
            this.table.delete(1),
          ])));
  }

  createUser(accessToken) {
    // TODO Get additional informations (Avatar url, ...)
    return this.userExists()
      .then(() =>
        this.table
          .put({
            id: 1,
            username: null,
            accessToken,
            scopes: null,
            avatarURL: null,
          }));
  }
}

module.exports = UserInfosTable;
