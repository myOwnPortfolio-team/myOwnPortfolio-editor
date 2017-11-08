import React from 'react';
import { Header } from 'semantic-ui-react';
import axios from 'axios';
import db from '../db';

import SideBar from './Sidebar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      database: props.database,
      modules: [],
    };

    this.checkModules = props.checkModules.bind(this.loadModules)
  }

  componentDidMount() {
    this.loadModules();
    this.checkModules();
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

function addModule(name) {
  db.table('modules')
    .put({
      name,
      sha: null,
      content: null,
      properties: null,
      style: null,
    });
}

function updateModule(dbModule, name, sha) {
  let needUpdate;
  let headers;

  if (typeof dbModule === 'undefined') {
    addModule(name);
    needUpdate = true;
  } else if (dbModule.sha !== sha) {
    needUpdate = true;
  }

  if (needUpdate) {
    // Retrieve JSON schema files
    headers = { headers: { Accept: 'application/vnd.github.VERSION.raw' }};

    axios.all([
      axios.get(
        `https://api.github.com/repos/myOwnPortfolio-team/myOwnPortfolio-core/contents/app/modules/${name}/jsons_schema/content.json`,
        headers,
      ),
      axios.get(
        `https://api.github.com/repos/myOwnPortfolio-team/myOwnPortfolio-core/contents/app/modules/${name}/jsons_schema/properties.json`,
        headers,
      ),
      axios.get(
        `https://api.github.com/repos/myOwnPortfolio-team/myOwnPortfolio-core/contents/app/modules/${name}/jsons_schema/style.json`,
        headers,
      ),
    ]).then(axios.spread((content, properties, style) =>
      db.table('modules')
        .update(
          { name },
          {
            sha,
            content: content.data,
            properties: properties.data,
            style: style.data,
          },
        )));
  }
}

function checkModules(updateCallback) {
  // Query to the GitHub API to get the list of modules
  axios.get('https://api.github.com/repos/myOwnPortfolio-team/myOwnPortfolio-core/contents/app/modules')
    .then((res) => {
      res.forEach((module) => {
        const { name } = module;
        const { sha } = module;

        db.modules
          .get({ name }, dbModule => updateModule(updateCallback, dbModule, name, sha));
      }).then(() => updateCallback());
    });
}

module.exports = App;
