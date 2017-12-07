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

const fields = (properties, required, content, updateContent) => Object.keys(properties).map((key, index) => {
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
          return input(properties, key, index, content[key], 'color', updateContent, isRequired);
        case 'input-number':
          return input(properties, key, index, content[key], 'number', updateContent, isRequired);
        case 'input-date':
          return input(properties, key, index, content[key], 'date', updateContent, isRequired);
        case 'input-text':
          return input(properties, key, index, content[key], 'text', updateContent, isRequired);
        case 'select-animation':
          return select(properties, key, index, content[key], animationOptions, updateContent, isRequired); // TODO to implement
        case 'textfield':
          return textfield(properties, key, index, content[key], isRequired);
        case 'textfield-markdown':
          return textfield(properties, key, index, content[key], isRequired); // TODO to implement
        default:
          return input(properties, key, index, content[key], 'text', updateContent, isRequired);
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
      return input(properties, key, index, content[key], 'text', updateContent, isRequired);
  }
});

module.exports = fields;
