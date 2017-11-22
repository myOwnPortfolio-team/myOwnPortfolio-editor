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

const fields = properties => Object.keys(properties).map((key, index) => {
  switch (properties[key].type) {
    case 'integer':
      switch (properties[key].input) {
        case 'slider':
          return slider(properties, key, index, '1');
        default:
          return slider(properties, key, index, '1');
      }
    case 'number':
      switch (properties[key].input) {
        case 'slider':
          return slider(properties, key, index, 'any');
        default:
          return slider(properties, key, index, 'any');
      }
    case 'string':
      switch (properties[key].input) {
        case 'color-picker':
          return input(properties, key, index, 'color'); // TODO to implement
        case 'input-number':
          return input(properties, key, index, 'number');
        case 'input-date':
          return input(properties, key, index, 'date');
        case 'input-text':
          return input(properties, key, index, 'text');
        case 'select-animation':
          return select(properties, key, index, animationOptions); // TODO to implement
        case 'textfield':
          return textfield(properties, key, index);
        case 'textfield-markdown':
          return textfield(properties, key, index); // TODO to implement
        default:
          return input(properties, key, index, 'text');
      }
    case 'boolean':
      switch (properties[key].input) {
        case 'checkbox':
          return checkbox(properties, key, index);
        default:
          return checkbox(properties, key, index);
      }
    case 'object':
      return (
        <div>
          <h2>{key}</h2>
          <div>{fields(properties[key].properties)}</div>
        </div>
      );
    default:
      return input(properties, key, index, 'text');
  }
});

module.exports = fields;
