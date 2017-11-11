/* eslint react/jsx-no-bind: off, react/no-unused-state: off */

import React from 'react';
import { Loader } from 'semantic-ui-react';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      database: props.database,
      modules: [],
    };
  }

  componentDidMount() {
    // Add content
  }

  render() {
    return (
      <div className="container app">
        <img src="./assets/icons/logo.svg" alt="My own Portfolio" className="logo" />
        <Loader />
      </div>
    );
  }
}

module.exports = App;
