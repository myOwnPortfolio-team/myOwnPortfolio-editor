import React from 'react';

import Header from './Header.jsx';
import SideBar from './Sidebar.jsx';
import Editor from './Editor.jsx';

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
      <div className="container">
        <Header />
        <SideBar modules={this.state.modules}>
          <Editor />
        </SideBar>
      </div>
    );
  }
}

module.exports = App;
