import React from 'react';

import EditionPage from '../pages/EditionPage.jsx';
import RenderPage from '../pages/RenderPage.jsx';
import HomePage from '../pages/HomePage.jsx';
import SplashPage from '../pages/SplashPage.jsx';

import platform from '../utils/platform';

class App extends React.Component {
  constructor(props) {
    super(props);

    const page = platform.isElectron() ? 'home' : 'splash';
    this.state = {
      database: props.database,
      modules: [],
      activeModule: null,
      activePage: page,
    };
  }

  componentDidMount() {
    // Check for updates and load modules
    if (platform.isElectron()) {
      const electron = platform.getPlatformModule(platform.getPlatform());
      electron.ipcRenderer.on('loadedModules', (event, modules) => {
        if (!this.state.activeModule && modules.length) {
          this.setState({ activeModule: modules[0] });
        }
        this.setState({ modules });
      });
    }
  }

  setModuleList(modules) {
    if (!this.state.activeModule && modules.length) {
      this.setState({ activeModule: modules[0] });
    }
    this.setState({ modules });
  }

  switchActiveModule(module) {
    this.setState({ activeModule: module });
  }

  switchPage(page) {
    this.setState({ activePage: page });
  }

  render() {
    const editionPage = (
      <EditionPage
        modules={this.state.modules}
        activeModule={this.state.activeModule}
        switchPage={page => this.switchPage(page)}
        switchActiveModule={module => this.switchActiveModule(module)}
      />
    );
    const renderPage = <RenderPage switchPage={page => this.switchPage(page)} />;
    const homePage = <HomePage switchPage={page => this.switchPage(page)} />;
    const splashPage = (
      <SplashPage
        database={this.state.database}
        version={this.props.version}
        switchPage={page => this.switchPage(page)}
        setModuleList={modules => this.setModuleList(modules)}
      />);
    switch (this.state.activePage) {
      case 'splash':
        return splashPage;
      case 'home':
        return homePage;
      case 'edition':
        return editionPage;
      case 'render':
        return renderPage;
      default:
        return homePage;
    }
  }
}

module.exports = App;
