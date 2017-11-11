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
    this.setState({ activePage: page });
  }

  page() {
    let page;

    switch (this.state.activePage) {
      case 'editor':
        page = (<Editor module={this.state.activeModule} handleCompilation={() => this.switchPage('render')} />);
        break;
      case 'render':
        page = (<Render url="http://thibault.theologien.fr" />);
        break;
      default:
        page = (<h1>My Own Portfolio</h1>);
    }

    return page;
  }

  render() {
    return (
      <div className="container app">
        <Header />
        <Grid>
          <Grid.Column width={3}>
            <Navbar
              modules={this.state.modules}
              activeItem={this.state.activeModule.name}
              handleClick={this.switchActiveModule.bind(this)}
            />
          </Grid.Column>

          <Grid.Column stretched width={13}>
            {this.page()}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

module.exports = App;
