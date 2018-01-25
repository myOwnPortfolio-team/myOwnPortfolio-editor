/* eslint no-undef: off */

const webSocketClosed = () => 'Websocket is closed.';
const requestTimeout = () => 'Request timed out.';

const processMessage = Symbol('Process a message received from the WebSocket server.');
const waitForConnection = Symbol('Wait for the connection to be established.');
const waitForKey = Symbol('Wait for the key to be set.');
const waitForAuthLink = Symbol('Wait for the authentication link to be received.');
const waitForAccessToken = Symbol('Wait for the access token to be set.');

class WebSocketClient {
  constructor(host, port) {
    try {
      this.webSocket = new WebSocket(`ws://${host}:${port}`);
    } catch (error) {
      throw error;
    }

    this.key = null;
    this.authLink = null;
    this.accessToken = null;

    this.connected = false;
    this.isClosed = false;
    this.authLinkError = null;
    this.accessTokenError = null;

    this.connectedPromise = new Promise((resolve, reject) => {
      this[waitForConnection](resolve, reject);
    });
    this.keyPromise = new Promise((resolve, reject) => {
      this.connectedPromise
        .then(() => {
          this[waitForKey](resolve, reject);
        });
    });
    this.authLinkPromise = null;
    this.accessTokenPromise = null;

    this.webSocket.onmessage = (event) => {
      this[processMessage](JSON.parse(event.data));
    };
    this.webSocket.onopen = () => {
      this.connected = true;
    };
  }

  /*
  The server response should be :
    * on success :
      {
        action: 'auth_link',
        authLink: 'LINK',
      }

    * on error :
      {
        action: 'error',
        error: 'ERROR',
      }
  */
  getAuthLink() {
    if (this.authLinkPromise === null) {
      this.authLinkPromise = new Promise((resolve, reject) => {
        if (this.authLink === null) {
          if (this.isClosed) {
            reject(webSocketClosed());
          }

          this.keyPromise
            .then((key) => {
              this.webSocket.send(JSON.stringify({
                action: 'auth_link',
                key,
              }));
            });
        }

        this[waitForAuthLink](resolve, reject);
      });
    }

    return this.authLinkPromise;
  }

  getAccessToken() {
    if (this.accessTokenPromise === null) {
      this.accessTokenPromise = new Promise((resolve, reject) => {
        if (this.accessToken === null) {
          if (this.isClosed) {
            reject(webSocketClosed());
          }

          this.keyPromise
            .then((key) => {
              this.webSocket.send(JSON.stringify({
                action: 'access_token',
                key,
              }));
            });
        }

        this[waitForAccessToken](resolve, reject);
      });
    }

    return this.accessTokenPromise;
  }

  close() {
    this.webSocket.close();
    this.isClosed = true;
  }

  [processMessage](message) {
    switch (message.action) {
      case 'key':
        this.key = message.key;
        break;
      case 'auth_link':
        this.authLink = message.authLink;
        break;
      case 'access_token':
        this.accessToken = message.accessToken;
        break;
      case 'client_id_error':
        this.clientIDError = message.error;
        break;
      case 'access_token_error':
        this.accessTokenError = message.error;
        break;
      default:
    }
  }

  [waitForConnection](resolve, reject, time = 0, wait = 250, timeout = 0) {
    if (timeout !== 0 && time >= timeout) {
      reject(requestTimeout());
    } else if (this.connected === false) {
      setTimeout(() => this[waitForConnection](resolve, reject, time + wait), wait);
    } else {
      resolve(this.connected);
    }
  }

  [waitForKey](resolve, reject, time = 0, wait = 250, timeout = 0) {
    if (timeout !== 0 && time >= timeout) {
      reject(requestTimeout());
    } else if (this.key === null) {
      setTimeout(() => this[waitForKey](resolve, reject, time + wait), wait);
    } else {
      resolve(this.key);
    }
  }

  [waitForAuthLink](resolve, reject, time = 0, wait = 250, timeout = 0) {
    if (timeout !== 0 && time >= timeout) {
      reject(requestTimeout());
    } else if (this.authLink === null && this.authLinkError === null) {
      setTimeout(() => this[waitForAuthLink](resolve, reject, time + wait), wait);
    } else if (this.authLinkError !== null) {
      const error = this.authLinkError;
      this.authLinkError = null;
      reject(error);
    } else {
      resolve(this.authLink);
    }
  }

  [waitForAccessToken](resolve, reject, wait = 250) {
    if (this.accessToken === null && this.accessTokenError === null) {
      setTimeout(() => this[waitForAccessToken](resolve, reject), wait);
    } else if (this.accessTokenError !== null) {
      const error = this.accessTokenError;
      this.accessTokenError = null;
      reject(error);
    } else {
      resolve(this.accessToken);
    }
  }
}

module.exports = WebSocketClient;
