/* eslint react/jsx-no-bind: off, react/no-unused-state: off */

import React from 'react';
import Loader from 'react-loaders';

import platform from '../utils/platform';

class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      database: props.database,
      message: 'Loading...',
      version: props.version,
    };
  }

  componentDidMount() {
    const tableModules = this.state.database.table('modules');
    const tableInfos = this.state.database.table('userInfos');
    // Load modules

    tableInfos
      .userExists()
      .then((exists) => {
        if (exists) {
          this.updateMessage('Loading user infos');
          return tableInfos.getUserInfos();
        }
        return undefined;
      })
      .then((user) => {
        this.updateMessage('Initializing modules');
        let token;
        if (user !== undefined) {
          token = user.accessToken;
        }

        return tableModules.fill(token);
      })
      .then(() => {
        this.updateMessage('Loading modules');
        return tableModules.getAll();
      })
      .then((modules) => {
        this.updateMessage('Loaded');

        if (platform.isElectron()) {
          const electron = platform.getPlatformModule(platform.getPlatform());
          electron.ipcRenderer.send('closeSplashScreen', modules);
        } else {
          this.props.setModuleList(modules);
          this.props.switchPage('home');
        }
      });
  }

  updateMessage(message) {
    this.setState({ message });
  }

  render() {
    return (
      <div className="container splash">
        <div className="image">
          <img className="logo" src="./assets/icons/logo.svg" alt="My own Portfolio" />
          <h1 className="title">My Own Portfolio</h1>
        </div>
        <div className="loader-container">
          <div className="infos-container">
            <div className="progress-text">
              {this.state.message}
            </div>
            <div className="version">
              {`${this.state.version.name} (v${this.state.version.id})`}
            </div>
          </div>
          <Loader type="ball-scale-ripple" />
        </div>
      </div>
    );
  }
}

module.exports = SplashScreen;
