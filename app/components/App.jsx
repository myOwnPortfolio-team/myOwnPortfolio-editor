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
      activeModuleIndex: -1,
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
    const index = this.state.myOwnPortfolio.push(module) - 1;
    this.switchActiveModule(index, module);
  }

  switchActiveModule(index, module) {
    this.setState({ activeModule: module });
    this.setState({ activeModuleIndex: index });
  }

  switchModules(order) {
    let index = this.state.activeModuleIndex;
    if (order === 'up' && (index > 0)) {
      this.state.myOwnPortfolio.splice(
        index - 1,
        2,
        this.state.myOwnPortfolio[index],
        this.state.myOwnPortfolio[index - 1],
      );
      index -= 1;
    } else if (order === 'down' && (index < this.state.myOwnPortfolio.length - 1)) {
      this.state.myOwnPortfolio.splice(
        index,
        2,
        this.state.myOwnPortfolio[index + 1],
        this.state.myOwnPortfolio[index],
      );
      index += 1;
    }

    this.setState({ activeModuleIndex: index });
  }

  deleteModule() {
    let index = this.state.activeModuleIndex;
    if (index !== -1) {
      this.state.myOwnPortfolio.splice(index, 1);
      if (index > 0) {
        index -= 1;
      } else if (this.state.myOwnPortfolio.length < 1) {
        index = -1;
      }
    }
    this.setState({ activeModuleIndex: index });
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
        activeModuleIndex={this.state.activeModuleIndex}
        addModule={module => this.addModule(module)}
        deleteModule={() => this.deleteModule()}
        switchModules={order => this.switchModules(order)}
        switchPage={page => this.switchPage(page)}
        switchActiveModule={(index, module) => this.switchActiveModule(index, module)}
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
