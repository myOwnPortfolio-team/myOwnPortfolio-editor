import { combineReducers } from 'redux';

const schemas = (state = {}, action) => {
  return state;
};

const content = (state = {}, action) => {
  return state;
};

const configuration = (state = {}, action) => {
  return state;
};

module.exports = combineReducers({
  schemas,
  content,
  configuration,
});
