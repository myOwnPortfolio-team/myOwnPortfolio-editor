/* eslint prefer-destructuring: "off", no-param-reassign:"off", no-case-declarations:"off" */

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Button, Segment } from 'semantic-ui-react';

import {
  checkbox,
  input,
  textfield,
  select,
  slider,
} from './Inputs.jsx';

const SELECT_ANIMATION_OPTIONS = require('../../properties/select_animation_options').options;

const initializeFields = (properties, required, cont) => {
  let content = cont;

  Object.keys(properties).forEach((key) => {
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
        case 'number':
          if (properties[key].input === 'slider' && properties[key].minimum) {
            updateField(properties[key].minimum, key);
          } else {
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
                [initializeFields(
                  properties[key].items.properties,
                  properties[key].items.required,
                  {},
                )],
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

  const updateArrayField = (value, arrayContent, i, updateArray) => {
    if (value !== undefined) {
      arrayContent[i] = value[0];
    } else {
      arrayContent.splice(i, 1);
    }
    updateArray(arrayContent);
  };

  const arrayField = (arrayProperties, arrayContent, updateArray) => {
    if (arrayContent !== undefined) {
      if (arrayProperties.items.type === 'object') {
        return Object.keys(arrayContent).map(key => (
          <Segment key={key}>
            {fields(
              arrayProperties.items.properties,
              arrayProperties.items.required,
              arrayContent[key],
              updateField,
            )}
            <Button
              onClick={() => {
                updateArrayField(undefined, arrayContent, key, updateArray);
              }}
            >
            Delete this item
            </Button>
          </Segment>
        ));
      }
      return arrayContent.map((key, index) => (
        <Segment key={key}>
          {fields(
            [arrayProperties.items],
            'isSimpleArray',
            [key],
            value => updateArrayField(value, arrayContent, index, updateArray),
          )}
          <Button
            onClick={() => {
              updateArrayField(undefined, arrayContent, index, updateArray);
            }}
            disabled={arrayContent.length <= arrayProperties.minItems}
          >
          Delete this item
          </Button>
        </Segment>
      ));
    }
    return (
      <div>Create an item</div>
    );
  };

  return Object.keys(properties).map((key) => {
    let isRequired = false;
    if (required === 'isSimpleArray') {
      isRequired = false;
    } else {
      isRequired = required.indexOf(key) !== -1;
    }

    switch (properties[key].type) {
      case 'integer':
        return slider(properties, key, content[key], '1', updateField, isRequired);
      case 'number':
        return slider(properties, key, content[key], 'any', updateField, isRequired);
      case 'string':
        switch (properties[key].input) {
          case 'color-picker':
            return input(properties, key, content[key], 'color', updateField, isRequired);
          case 'input-number':
            return input(properties, key, content[key], 'number', updateField, isRequired);
          case 'input-date':
            return input(properties, key, content[key], 'date', updateField, isRequired);
          case 'select-animation':
            return select(
              properties,
              key,
              content[key],
              SELECT_ANIMATION_OPTIONS,
              updateField,
              isRequired,
            );
          case 'textfield':
            return textfield(properties, key, content[key], updateField, isRequired);
          case 'textfield-markdown':
            return (
              <div className="textfield-markdown">
                {textfield(properties, key, content[key], updateField, isRequired)}
                <div>
                  <p>Preview</p>
                  <ReactMarkdown source={content[key]} />
                </div>
              </div>
            );
          case 'input-text':
            return input(properties, key, content[key], 'text', updateField, isRequired);
          default:
            return input(properties, key, content[key], 'text', updateField, isRequired);
        }
      case 'boolean':
        return checkbox(properties, key, content[key], updateField, isRequired);
      case 'object':
        return (
          <Segment key={key}>
            <h1>Object : {key.replace(/_/g, ' ')}</h1>
            <div>
              {fields(
                properties[key].properties,
                properties[key].required,
                content[key],
                updateField,
              )}
            </div>
          </Segment>
        );
      case 'array':
        let newArrayContent = '';
        if (properties[key].items.type === 'object') {
          newArrayContent = {};
        }
        return (
          <Segment key={key}>
            <div>List of : {key.replace(/_/g, ' ')}</div>
            <Button
              onClick={() => {
                content[key][content[key].length] = newArrayContent;
                updateField(content[key], key);
                if (properties[key].items.type === 'object') {
                  initializeFields(
                    properties[key].items.properties,
                    properties[key].items.required,
                    content[key][content[key].length - 1],
                  );
                } else {
                  initializeFields(
                    properties[key].items,
                    'isSimpleArray',
                    content[key][content[key].length - 1],
                  );
                }
              }}
            >
            Add a new item
            </Button>
            {arrayField(
              properties[key],
              content[key],
              updateField,
            )}
          </Segment>
        );
      default:
        return input(properties, key, content[key], 'text', updateField, isRequired);
    }
  });
};

module.exports = { initializeFields, fields };
