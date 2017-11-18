/* eslint react/jsx-no-bind: off, react/no-unused-state: off */

import React from 'react';
import Loader from 'react-loaders';

class Loading extends React.Component {
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
      <div className="container splash">
        <div className="image">
          <img className="logo" src="./assets/icons/logo.svg" alt="My own Portfolio" />
          <h1 className="title">My Own Portfolio</h1>
        </div>
        <div className="loader-container">
          <Loader type="ball-scale-ripple" />
        </div>
      </div>
    );
  }
}

module.exports = Loading;
