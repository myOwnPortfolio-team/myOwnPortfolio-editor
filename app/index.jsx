/* global document */

import React from 'react';
import ReactDOM from 'react-dom';

import App from './classes/App.jsx';

import data from './config/app_properties.json';

import './import.js';

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
  <App data={data} />,
  document.getElementById('root'),
);
