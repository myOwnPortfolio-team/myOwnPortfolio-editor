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
    const kvStore = this.state.database.table('kvStore');

    // Load modules
    this.updateMessage('Loading user infos');
    kvStore
      .get('accessToken')
      .then((accessToken) => {
        this.updateMessage('Downloading json schemas');

        return Promise.all([
          tableModules.fill(accessToken),
          kvStore.fill(accessToken),
        ]);
      })
      .then(() => {
        this.updateMessage('Loading modules and app properties');
        return Promise.all([
          tableModules.getAll(),
          kvStore.get('appPropertiesSchema'),
        ]);
      })
      .then((data) => {
        this.updateMessage('Loaded');

        if (platform.isElectron()) {
          const electron = platform.getPlatformModule(platform.getPlatform());
          electron.ipcRenderer.send('closeSplashScreen', data[0], data[1]);
        } else {
          this.props.setModuleList(data[0]);
          this.props.setAppPropertiesSchema(data[1]);
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
