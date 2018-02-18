import { createStore } from 'redux';
import reducers from './reducers';

// const configuration = require('../../properties/configuration.json');
//
// const initialState = {
//   schemas: {
//     appProperties: {},
//     moduleSettings: {},
//   },
//   content: {
//     appProperties: {},
//     modules: [],
//   },
//   configuration,
// };

const store = createStore(reducers);

module.exports = store;
