/* eslint react/jsx-no-bind: off, react/no-unused-state: off */

import React from 'react';
import Loader from 'react-loaders';
import Axios from 'axios';

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
    let token;

    // Load modules
    this.updateMessage('Loading user infos');
    kvStore
      .get('accessToken')
      .then((accessToken) => {
        token = accessToken;
        this.updateMessage('Downloading json modules');

        return tableModules.fill(token);
      })
      .then(() => {
        this.updateMessage('Downloading app properties schema');
        return kvStore.fill(token);
      })
      .then(() => {
        this.updateMessage('Retrieving existing portfolio');
        return Axios
          .get(`http://${this.props.serverHost}:${this.props.serverPort}${this.props.serverGetURL}?token=${token}`);
      })
      .then((res) => {
        this.updateMessage('Saving existing portfolio');
        let content;
        if (res.data && res.data.status === 200) {
          content = res.data.message;
        }

        return kvStore.set('content', content);
      })
      .then(() => {
        this.updateMessage('Loading modules and app properties');
        return Promise.all([
          tableModules.getAll(),
          kvStore.get('appPropertiesSchema'),
          kvStore.get('content'),
          kvStore.get('userID'),
        ]);
      })
      .then((data) => {
        this.updateMessage('Loaded');
        const url = `http://${this.props.serverHost}:${this.props.serverPort}/${data[3]}`;

        if (platform.isElectron()) {
          const electron = platform.getPlatformModule(platform.getPlatform());
          electron.ipcRenderer.send('closeSplashScreen', data[0], data[1], data[2], url);
        } else {
          this.props.setModuleList(data[0]);
          this.props.setAppPropertiesSchema(data[1]);
          this.props.setAppContent(data[2]);
          this.props.setRenderedURL(url);
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
