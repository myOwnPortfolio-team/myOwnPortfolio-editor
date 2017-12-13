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

const initializeFields = (properties, required, cont) => {
  let content = cont;
  Object.keys(properties).map((key) => {
    const updateField = (value, k) => {
      if (required === 'isSimpleArray') {
        content = value;
      } else {
        content[k] = value;
      }
    };

    const isRequired = required.indexOf(key) !== -1 || required === 'isSimpleArray';

    if (isRequired) {
      switch (properties[key].type) {
        case 'integer':
        case 'number':
          switch (properties[key].input) {
            case 'slider':
              if (properties[key].minimum === undefined) {
                updateField(0, key);
              } else {
                updateField(properties[key].minimum, key);
              }
              break;
            default:
              updateField(0, key);
          }
          break;
        case 'string':
          updateField('', key);
          break;
        case 'boolean':
          updateField(false, key);
          break;
        case 'object':
          updateField(
            initializeFields(
              properties[key].properties,
              properties[key].required,
              {},
            ),
            key,
          );
          break;
        case 'array':
          if (properties[key].minItems > 0) {
            if (properties[key].items.type === 'object') {
              updateField(
                initializeFields(
                  properties[key].items.properties,
                  properties[key].items.required,
                  {},
                ),
                key,
              );
            } else {
              updateField(
                [initializeFields(
                  [properties[key].items],
                  'isSimpleArray',
                  {},
                )],
                key,
              );
            }
          } else {
            updateField([], key);
          }
          break;
        default:
          updateField('', key);
      }
    }
  });
  return content;
};

const fields = (properties, required, cont, updateContent) => {
  const content = cont;

  const updateField = (value, k) => {
    content[k] = value;
    updateContent(content);
  };

  const arrayField = (arrayProperties, arrayContent) => {
    if (arrayProperties.items.type === 'object') {
      return Object.keys(arrayContent).map((key) => {
        return (
          <div>
            {fields(
              arrayProperties.items.properties,
              arrayProperties.items.required,
              arrayContent[key],
              updateField,
            )}
          </div>
        );
      });
    }
    return (
      <div>
        {fields(
          [arrayProperties.items],
          'isSimpleArray',
          arrayContent,
          updateField,
        )}
      </div>
    );
  };

  return Object.keys(properties).map((key, index) => {
    let isRequired = false;
    if (required === 'isSimpleArray') {
      isRequired = true;
    } else {
      isRequired = required.indexOf(key) !== -1;
    }

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
      case 'array':
        return (
          <div>
            <div>
              {arrayField(
                properties[key],
                content[key],
              )}
            </div>
          </div>
        );
      default:
        return input(properties, key, index, content[key], 'text', updateContent, isRequired);
    }
  });
}
};

module.exports = { initializeFields, fields };
