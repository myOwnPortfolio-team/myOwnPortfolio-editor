import React from 'react';
import { Checkbox, Form, Input, Select, TextArea } from 'semantic-ui-react'

const checkbox = (properties, key, index, isRequired) => (
  <div>
    <div>{key}</div>
    <Form.Field
      control={Checkbox}
      key={index}
      label={properties[key].description}
      required={isRequired}
    />
  </div>
);

const input = (properties, key, index, type, isRequired) => (
  <Form.Field
    control={Input}
    key={index}
    label={key}
    placeholder={properties[key].description}
    type={type}
    required={isRequired}
  />
);

const textfield = (properties, key, index, isRequired) => (
  <Form.Field
    control={TextArea}
    key={index}
    label={key}
    placeholder={properties[key].description}
    required={isRequired}
  />
);

const select = (properties, key, index, options, isRequired) => (
  <Form.Field
    control={Select}
    key={index}
    label={key}
    placeholder={properties[key].description}
    options={options}
    required={isRequired}
  />
);

const slider = (properties, key, index, step, isRequired) => (
  <Form.Field
    control={Input}
    key={index}
    label={key}
    placeholder={properties[key].description}
    type="range"
    min={properties[key].minimum}
    max={properties[key].maximum}
    step={step}
    required={isRequired}
  />
);


module.exports = {
  checkbox,
  input,
  textfield,
  select,
  slider,
};
