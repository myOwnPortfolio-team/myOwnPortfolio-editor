class UserInfos {
  constructor(username, accessToken, scopes, avatarURL = null) {
    this.username = username;
    this.accessToken = accessToken;
    this.scopes = scopes;
    this.avatarURL = avatarURL;
  }
}

module.exports = UserInfos;
