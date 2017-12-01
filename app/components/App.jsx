import React from 'react';

import EditionPage from '../pages/EditionPage.jsx';
import RenderPage from '../pages/RenderPage.jsx';
import HomePage from '../pages/HomePage.jsx';

import Module from '../data/objects/module';

import platform from '../utils/platform';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      database: props.database,
      modules: [],
      myOwnPortfolio: [],
      activeModule: new Module('default'),
      activePage: 'editor',
    };
  }

  componentDidMount() {
    // Check for updates and load modules
    if (platform.isElectron()) {
      const electron = platform.getPlatformModule(platform.getPlatform());
      electron.ipcRenderer.on('loadedModules', (event, modules) => {
        this.setState({ modules });
      });
    } else {
      const table = this.state.database.table('modules');

      table
        .fill()
        .then(() => {
          table
            .getAll()
            .then((modules) => {
              this.setState({ modules });
            });
        });
    }
  }

  addModule(module) {
    this.state.myOwnPortfolio.push(module);
    this.switchActiveModule(module);
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
        myOwnPortfolio={this.state.myOwnPortfolio}
        activeModule={this.state.activeModule}
        addModule={module => this.addModule(module)}
        switchPage={page => this.switchPage(page)}
        switchActiveModule={module => this.switchActiveModule(module)}
      />
    );
    const renderPage = <RenderPage switchPage={page => this.switchPage(page)} />;
    const homePage = <HomePage switchPage={page => this.switchPage(page)} />;

    switch (this.state.activePage) {
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
