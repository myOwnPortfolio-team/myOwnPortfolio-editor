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
      activeModule: new Module('default'),
      activePage: 'editor',
    };
  }

  componentDidMount() {
    const table = this.state.database.table('modules');

    // Check for updates and load modules
    if (platform.isElectron) {
      const electron = platform.getPlatformModule(platform.getPlatform());
      electron.ipcRenderer.on('loadedModules', (event, modules) => {
        console.log('electron ok');
        if (!this.state.activeModule && modules.length) {
          this.setState({ activeModule: modules[0] });
        }
        this.setState({ modules });
      });
    } else {
      table
        .fill()
        .then(() => {
          table
            .getAll()
            .then((modules) => {
              if (!this.state.activeModule && modules.length) {
                this.setState({ activeModule: modules[0] });
              }

              this.setState({ modules });
            });
        });
    }
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
