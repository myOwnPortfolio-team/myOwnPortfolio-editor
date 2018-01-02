import React from 'react';

import EditionPage from '../pages/EditionPage.jsx';
import RenderPage from '../pages/RenderPage.jsx';
import HomePage from '../pages/HomePage.jsx';
import SplashPage from '../pages/SplashPage.jsx';
import Module from '../data/objects/module.js';

import { initializeFields } from './Fields.jsx';

import platform from '../utils/platform';

class App extends React.Component {
  constructor(props) {
    super(props);

    const page = platform.isElectron() ? 'home' : 'splash';
    this.state = {
      database: props.database,
      modules: [],
      myOwnContent: [],
      appPropertiesSchema: {},
      moduleSettingSchema: {},
      myOwnModules: [],
      activeModule: new Module('default'),
      activeModuleIndex: -1,
      activePage: page,
    };
  }

  componentDidMount() {
    // Check for updates and load modules
    if (platform.isElectron()) {
      const electron = platform.getPlatformModule(platform.getPlatform());
      electron.ipcRenderer.on('loadedModules', (event, modules) => {
        this.setState({ modules });
      });
    }
    this.setState({
      myOwnContent: {
        name: '',
        app_properties: {},
        modules: [],
      },
      moduleSettingSchema: this.props.moduleSettingSchema,
    });
  }

  setModuleList(modules) {
    if (!this.state.activeModule && modules.length) {
      this.setState({ activeModule: modules[0] });
    }
    this.setState({ modules });
  }

  addModule(module) {
    const index = this.state.myOwnModules.push(module) - 1;
    this.state.myOwnContent.modules.push({
      name: module.name,
      type: module.name,
      referenced: true,
      content: initializeFields(
        module.schema.content.properties,
        module.schema.content.required,
        {},
      ),
      properties: initializeFields(
        module.schema.properties.properties,
        module.schema.properties.required,
        {},
      ),
      style: initializeFields(
        module.schema.style.properties,
        module.schema.style.required,
        {},
      ),
    });
    this.switchActiveModule(index, module);
  }

  switchActiveModule(index, module) {
    this.setState({
      activeModule: module,
      activeModuleIndex: index,
    });
  }

  switchModules(order) {
    let index = this.state.activeModuleIndex;
    if (order === 'up' && (index > 0)) {
      this.state.myOwnModules.splice(
        index - 1,
        2,
        this.state.myOwnModules[index],
        this.state.myOwnModules[index - 1],
      );
      index -= 1;
    } else if (order === 'down' && (index < this.state.myOwnModules.length - 1)) {
      this.state.myOwnModules.splice(
        index,
        2,
        this.state.myOwnModules[index + 1],
        this.state.myOwnModules[index],
      );
      index += 1;
    }

    this.setState({ activeModuleIndex: index });
  }

  deleteModule() {
    let index = this.state.activeModuleIndex;
    if (index !== -1) {
      this.state.myOwnModules.splice(index, 1);
      this.state.myOwnContent.modules.splice(index, 1);
      if (index > 0) {
        index -= 1;
      } else if (this.state.myOwnModules.length < 1) {
        index = -1;
        this.setState({ activeModule: new Module('default') });
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
        myOwnContent={this.state.myOwnContent}
        appPropertiesSchema={this.state.appPropertiesSchema}
        moduleSettingSchema={this.state.moduleSettingSchema}
        myOwnModules={this.state.myOwnModules}
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
    const splashPage = (
      <SplashPage
        database={this.state.database}
        version={this.props.version}
        switchPage={page => this.switchPage(page)}
        setModuleList={modules => this.setModuleList(modules)}
        serverHost={this.props.serverHost}
        serverPort={this.props.serverPort}
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
