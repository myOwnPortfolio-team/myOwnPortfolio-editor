import React from 'react';
import { Header } from 'semantic-ui-react';

import SideBar from './Sidebar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      database: props.database,
      modules: [],
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

  render() {
    return (
      <div className="app">
        <Header as="h1" className="navbar">{this.props.data.title}</Header>
        <SideBar />
      </div>
    );
  }
}

module.exports = App;
