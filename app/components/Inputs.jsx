import React from 'react';
import { Form } from 'semantic-ui-react';

const checkbox = (properties, key, index) => (
  <div>
    <div>{key}</div>
    <Form.Checkbox key={index} label={properties[key].description} />
  </div>
);

const input = (properties, key, index, type) => (
  <Form.Field key={index}>
    <label htmlFor={index}>{key}</label>
    <input id={index} placeholder={properties[key].description} type={type} />
  </Form.Field>
);

const textfield = (properties, key, index) => (
  <Form.Field key={index}>
    <Form.TextArea id={index} label={key} placeholder={properties[key].description} />
  </Form.Field>
);

const select = (properties, key, index, options) => (
  <Form.Select
    key={index}
    label={key}
    options={options}
    placeholder={properties[key].description}
  />
);

const slider = (properties, key, index) => (
  <Form.Field key={index}>
    <label htmlFor={index}>{key}</label>
    <div>{properties[key].description}</div>
    <input
      id={index}
      type="range"
      min={properties[key].minimum}
      max={properties[key].maximum}
    />
  </Form.Field>
);


module.exports = {
  checkbox,
  input,
  textfield,
  select,
  slider,
};
