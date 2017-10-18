import React from 'react';
import { Header } from 'semantic-ui-react';

import SideBar from './Sidebar.jsx';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Header as="h1">{this.props.data.title}</Header>
        <SideBar />
      </div>
    );
  }
}

module.exports = App;
