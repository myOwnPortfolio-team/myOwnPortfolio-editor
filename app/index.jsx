/* global document */

import React from 'react';
import ReactDOM from 'react-dom';
import { Header } from 'semantic-ui-react';

import SideBar from './classes/Sidebar.jsx';

import data from './config/app_properties.json';
import modules from './config/modules.json';

import './style/index.scss';

function App(props) {
  return (
    <div className="app">
      <Header as="h1">{props.data.title}</Header>
      <SideBar modules={props.modules.modules} />
    </div>
  );
}

// ========================================

const db = new Dexie('LocalStorage');

// Create schema
db.version(1).stores({
  person: 'firstName, lastName',
});

// Open the database
db.open();

// Adding data
db.person.add({
  firstName: 'f1',
  lastName: 'l1',
});

db.person.add({
  firstName: 'f2',
  lastName: 'l2',
});

db.person.add({
  firstName: 'f3',
  lastName: 'l3',
});

ReactDOM.render(
  <App data={data} modules={modules} />,
  document.getElementById('root'),
);
