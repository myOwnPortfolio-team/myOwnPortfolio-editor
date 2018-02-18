import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './Routes.jsx';
import store from '../store';

console.log(Routes);

const App = () => (
  <Provider store={store}>
    <Router>
      <div>
        {Routes}
      </div>
    </Router>
  </Provider>
);

module.exports = App;
