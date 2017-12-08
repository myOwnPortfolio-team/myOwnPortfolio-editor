import React from 'react';
import ReactMarkdown from 'react-markdown';

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

const fields = (properties, required, content, updateContent) =>
  Object.keys(properties).map((key, index) => {
    const updateField = (value, k) => {
      content[k] = value;
      updateContent(content);
    };

    const isRequired = required.indexOf(key) !== -1;

    switch (properties[key].type) {
      case 'integer':
        switch (properties[key].input) {
          case 'slider':
            return slider(properties, key, index, content[key], '1', updateField, isRequired);
          default:
            return slider(properties, key, index, content[key], '1', updateField, isRequired);
        }
      case 'number':
        switch (properties[key].input) {
          case 'slider':
            return slider(properties, key, index, content[key], 'any', updateField, isRequired);
          default:
            return slider(properties, key, index, content[key], 'any', updateField, isRequired);
        }
      case 'string':
        switch (properties[key].input) {
          case 'color-picker':
            return input(properties, key, index, content[key], 'color', updateField, isRequired);
          case 'input-number':
            return input(properties, key, index, content[key], 'number', updateField, isRequired);
          case 'input-date':
            return input(properties, key, index, content[key], 'date', updateField, isRequired);
          case 'input-text':
            return input(properties, key, index, content[key], 'text', updateField, isRequired);
          case 'select-animation':
            return select(
              properties,
              key,
              index,
              content[key],
              animationOptions,
              updateField,
              isRequired,
            ); // TODO to implement
          case 'textfield':
            return textfield(properties, key, index, content[key], updateField, isRequired);
          case 'textfield-markdown':
            return (
              <div>
                {textfield(properties, key, index, content[key], updateField, isRequired)}
                <ReactMarkdown source={content[key]} />
              </div>
            );
          default:
            return input(properties, key, index, content[key], 'text', updateField, isRequired);
        }
      case 'boolean':
        switch (properties[key].input) {
          case 'checkbox':
            return checkbox(properties, key, index, content[key], updateField, isRequired);
          default:
            return checkbox(properties, key, index, content[key], updateField, isRequired);
        }
      case 'object':
        return (
          <div>
            <h2>{key}</h2>
            <div>
              {fields(
                properties[key].properties,
                properties[key].required,
                content[key],
                updateField,
              )}
            </div>
          </div>
        );
      default:
        return input(properties, key, index, content[key], 'text', updateContent, isRequired);
    }
  });

module.exports = fields;
