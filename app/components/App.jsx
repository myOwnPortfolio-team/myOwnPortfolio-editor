import React from 'react';

import EditionPage from '../pages/EditionPage.jsx';
import RenderPage from '../pages/RenderPage.jsx';
import HomePage from '../pages/HomePage.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      database: props.database,
      modules: [],
      activeModule: { name: 'about' }, // need to be changed
      activePage: 'editor',
    };

    this.checkModules = props.checkModules;
  }

  componentDidMount() {
    // Initial loading
    this.loadModules();

    // Check for updates
    this.checkModules(this.loadModules);
  }

  loadModules() {
    // Loading data from database
    this.state.database.table('modules')
      .toArray()
      .then(modules => this.setState({ modules }));
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
