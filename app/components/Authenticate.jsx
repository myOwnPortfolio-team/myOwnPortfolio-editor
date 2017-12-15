/* global window */

import React from 'react';
import { Button } from 'semantic-ui-react';

import WebSocketClient from '../auth/websocket';
import platform from '../utils/platform';

const openWindow = (authLink) => {
  if (platform.isElectron()) {
    const electron = platform.getPlatformModule(platform.getPlatform());
    electron.shell.openExternal(authLink);
  } else {
    window.open(authLink);
  }
};

class Authenticate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      database: props.database,
      authLink: undefined,
      serverHost: props.serverHost,
      serverPort: props.serverPort,
    };
  }

  componentDidMount() {
    this.state.database
      .table('userInfos')
      .userExists()
      .then((exists) => {
        if (exists) {
          this.props.switchPage('splash');
        } else {
          const socket = new WebSocketClient(this.state.serverHost, this.state.serverPort);

          socket
            .getAuthLink()
            .then((link) => {
              this.setState({ authLink: link });
            })
            .catch(() => this.props.switchPage('splash'));

          socket
            .getAccessToken()
            .then((token) => {
              this.state.database
                .table('userInfos')
                .createUser(token)
                .then(() => this.props.switchPage('splash'));
            })
            .catch(() => this.props.switchPage('splash'));
        }
      })
      .catch(() => this.props.switchPage('splash'));
  }

  render() {
    let button;
    if (this.state.authLink !== undefined) {
      button = (
        <Button
          content="Authenticate"
          icon="github alternate"
          labelPosition="left"
          color="blue"
          onClick={() => openWindow(this.state.authLink)}
        />
      );
    } else {
      button = (
        <Button
          content="Authenticate"
          icon="github alternate"
          labelPosition="left"
          disabled
        />
      );
    }

    return (
      <div className="container authenticate">
        <div className="image">
          <img className="logo" src="./assets/icons/logo.svg" alt="My own Portfolio" />
          <h1 className="title">My Own Portfolio</h1>
        </div>
        <div className="button-container">
          <div className="auth-button">
            {button}
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Authenticate;
