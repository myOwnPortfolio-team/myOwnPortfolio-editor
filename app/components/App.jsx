/* eslint react/jsx-no-bind: off */

import React from 'react';
import { Grid } from 'semantic-ui-react';

import Header from './Header.jsx';
import Navbar from './Navbar.jsx';
import Editor from './Editor.jsx';
import Render from './Render.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      database: props.database,
      modules: [],
      activeModule: { name: '' },
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
    console.log("ici");
    this.setState({ activePage: page });
  }

  page() {
    const controlPage = (
      <Grid>
        <Grid.Column width={3}>
          <Navbar
            modules={this.state.modules}
            activeItem={this.state.activeModule.name}
            handleClick={this.switchActiveModule.bind(this)}
          />
        </Grid.Column>
        <Grid.Column stretched width={13}>
          <Editor module={this.state.activeModule} />
        </Grid.Column>
      </Grid>
    );

    const renderPage = <Render url="http://thibault.theologien.fr" />;

    switch (this.state.activePage) {
      case 'editor':
        return controlPage;
      case 'render':
        return renderPage;
      default:
        return controlPage;
    }
  }

  render() {
    return (
      <div className="container app">
        <Header switchPage={this.switchPage.bind(this)} />
        {this.page()}
      </div>
    );
  }
}

module.exports = App;
