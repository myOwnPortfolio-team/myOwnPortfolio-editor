/* global document */

import React from 'react';
import ReactDOM from 'react-dom';

import Loading from './components/Loading.jsx';
import { database, checkModules } from './database';
import './import.js';

ReactDOM.render(
  <Loading database={database} checkModules={checkModules} />,
  document.getElementById('root'),
);
