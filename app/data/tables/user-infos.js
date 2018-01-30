import Table from './table';
import UserInfos from '../objects/user-infos';

class UserInfosTable extends Table {
  constructor(database) {
    super(database, 'userInfos', 'id, username, scopes, avatarURL');
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
          infos.scopes,
          infos.avatarURL,
        ));
  }

  removeUser() {
    // TODO Revoke access token (Request to My Own Portfolio server)
    return this.userExists()
      .then(() => this.getUserInfos()
        .then(() =>
          Promise.all([
            this.table.delete(1),
          ])));
  }

  createUser() {
    // TODO Get additional informations (Avatar url, ...)
    return this.userExists()
      .then(() =>
        this.table
          .put({
            id: 1,
            username: null,
            scopes: null,
            avatarURL: null,
          }));
  }
}

module.exports = UserInfosTable;
