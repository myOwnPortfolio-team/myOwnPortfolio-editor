/* eslint react/no-did-mount-set-state: "off" */

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
      activeModule: new Module('default'),
      activeModuleIndex: -1,
      activePage: page,
      appPropertiesSchema: {},
      database: props.database,
      moduleListSchema: {},
      moduleSettingSchema: this.props.moduleSettingSchema,
      modules: [],
      myOwnContent: {
        name: '',
        app_properties: {},
        modules: [],
      },
      myOwnModules: [],
      url: undefined,
    };
  }

  componentWillMount() {
    // Check for updates and load modules
    if (platform.isElectron()) {
      const electron = platform.getPlatformModule(platform.getPlatform());
      electron.ipcRenderer.on('loadedModules', (event, modules) => {
        this.setState({ modules });
      });

      electron.ipcRenderer.on('loadedAppPropertiesSchema', (event, appPropertiesSchema) => {
        this.setState({ appPropertiesSchema });
      });

      electron.ipcRenderer.on('loadedContent', (event, appContent) => {
        if (appContent) {
          this.setState({ myOwnContent: appContent });
        }
      });
    }
  }

  setAppContent(myOwnContent) {
    if (myOwnContent) {
      const myOwnModules = myOwnContent.modules.map(currentModule =>
        this.state.modules.find(module => currentModule.type === module.name));
      this.setState({
        myOwnContent,
        myOwnModules,
      });
    }
  }

  setAppPropertiesSchema(appPropertiesSchema) {
    this.setState({ appPropertiesSchema });
  }

  setModuleList(modules) {
    if (!this.state.activeModule && modules.length) {
      this.setState({ activeModule: modules[0] });
    }
    this.setState({ modules });
  }

  setRenderedURL(url) {
    this.setState({ url });
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

  switchActiveModule(index, module) {
    this.setState({
      activeModule: module,
      activeModuleIndex: index,
    });
  }

  switchModules(order) {
    const { myOwnModules } = this.state;
    let index = this.state.activeModuleIndex;
    if (order === 'up' && (index > 0)) {
      myOwnModules.splice(
        index - 1,
        2,
        myOwnModules[index],
        myOwnModules[index - 1],
      );
      index -= 1;
    } else if (order === 'down' && (index < myOwnModules.length - 1)) {
      myOwnModules.splice(
        index,
        2,
        myOwnModules[index + 1],
        myOwnModules[index],
      );
      index += 1;
    }
    this.setState({
      activeModuleIndex: index,
      myOwnModules,
    });
  }

  addModule(module) {
    const { myOwnContent, myOwnModules } = this.state;
    const index = myOwnModules.push(module) - 1;
    myOwnContent.modules.push({
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
    this.setState({
      myOwnContent,
      myOwnModules,
    });
    this.switchActiveModule(index, module);
  }

  updateContent(content, activeTab) {
    const { myOwnContent } = this.state;

    if (activeTab === 'module') {
      myOwnContent.modules[this.state.activeModuleIndex] = content;
    } else if (activeTab) {
      myOwnContent.modules[this.state.activeModuleIndex][activeTab] = content;
    } else {
      myOwnContent.app_properties = content;
    }

    this.setState({
      myOwnContent,
    });
  }

  render() {
    const editionPage = (
      <EditionPage
        activeModule={this.state.activeModule}
        activeModuleIndex={this.state.activeModuleIndex}
        addModule={module => this.addModule(module)}
        appPropertiesSchema={this.state.appPropertiesSchema}
        database={this.state.database}
        deleteModule={() => this.deleteModule()}
        moduleListSchema={this.state.moduleListSchema}
        moduleSettingSchema={this.state.moduleSettingSchema}
        modules={this.state.modules}
        myOwnContent={this.state.myOwnContent}
        myOwnModules={this.state.myOwnModules}
        serverHost={this.props.serverHost}
        serverPort={this.props.serverPort}
        serverPostURL={this.props.serverPostURL}
        setRenderedURL={this.setRenderedURL}
        switchActiveModule={(index, module) => this.switchActiveModule(index, module)}
        switchModules={order => this.switchModules(order)}
        switchPage={page => this.switchPage(page)}
        updateContent={(content, activeTab) => this.updateContent(content, activeTab)}
      />
    );
    const renderPage = (
      <RenderPage
        database={this.state.database}
        switchPage={page => this.switchPage(page)}
        url={this.state.url}
      />);
    const homePage = <HomePage switchPage={page => this.switchPage(page)} />;
    const splashPage = (
      <SplashPage
        database={this.state.database}
        serverHost={this.props.serverHost}
        serverPort={this.props.serverPort}
        serverWSPort={this.props.serverWSPort}
        serverGetURL={this.props.serverGetURL}
        setModuleList={modules => this.setModuleList(modules)}
        setAppContent={appContent => this.setAppContent(appContent)}
        setAppPropertiesSchema={
          appPropertiesSchema => this.setAppPropertiesSchema(appPropertiesSchema)
        }
        switchPage={page => this.switchPage(page)}
        version={this.props.version}
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
