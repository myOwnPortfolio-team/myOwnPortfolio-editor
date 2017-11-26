import React from 'react';

import {
  checkbox,
  input,
  textfield,
  select,
  slider,
} from './Inputs.jsx';

const animationOptions = [
  { key: '0', text: '0', value: '0' },
  { key: '1', text: '1', value: '1' },
];

const fields = (properties, required) => Object.keys(properties).map((key, index) => {
  const isRequired = required.indexOf(key) !== -1;
  switch (properties[key].type) {
    case 'integer':
      switch (properties[key].input) {
        case 'slider':
          return slider(properties, key, index, '1', isRequired);
        default:
          return slider(properties, key, index, '1', isRequired);
      }
    case 'number':
      switch (properties[key].input) {
        case 'slider':
          return slider(properties, key, index, 'any', isRequired);
        default:
          return slider(properties, key, index, 'any', isRequired);
      }
    case 'string':
      switch (properties[key].input) {
        case 'color-picker':
          return input(properties, key, index, 'color', isRequired);
        case 'input-number':
          return input(properties, key, index, 'number', isRequired);
        case 'input-date':
          return input(properties, key, index, 'date', isRequired);
        case 'input-text':
          return input(properties, key, index, 'text', isRequired);
        case 'select-animation':
          return select(properties, key, index, animationOptions, isRequired); // TODO to implement
        case 'textfield':
          return textfield(properties, key, index, isRequired);
        case 'textfield-markdown':
          return textfield(properties, key, index, isRequired); // TODO to implement
        default:
          return input(properties, key, index, 'text', isRequired);
      }
    case 'boolean':
      switch (properties[key].input) {
        case 'checkbox':
          return checkbox(properties, key, index, isRequired);
        default:
          return checkbox(properties, key, index, isRequired);
      }
    case 'object':
      return (
        <div>
          <h2>{key}</h2>
          <div>{fields(properties[key].properties, properties[key].required)}</div>
        </div>
      );
    default:
      return input(properties, key, index, 'text', isRequired);
  }
});

module.exports = fields;
