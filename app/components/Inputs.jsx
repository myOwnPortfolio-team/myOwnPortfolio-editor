import React from 'react';
import { Checkbox, Form, Input, Select, TextArea } from 'semantic-ui-react'

const checkbox = (properties, key, index) => (
  <div>
    <div>{key}</div>
    <Form.Field
      control={Checkbox}
      key={index}
      label={properties[key].description}
    />
  </div>
);

const input = (properties, key, index, type) => (
  <Form.Field
    control={Input}
    key={index}
    label={key}
    placeholder={properties[key].description}
    type={type}
  />
);

const textfield = (properties, key, index) => (
  <Form.Field
    control={TextArea}
    key={index}
    label={key}
    placeholder={properties[key].description}
  />
);

const select = (properties, key, index, options) => (
  <Form.Field
    control={Select}
    key={index}
    label={key}
    placeholder={properties[key].description}
    options={options}
  />
);

const slider = (properties, key, index, step) => (
  <Form.Field
    control={Input}
    key={index}
    label={key}
    placeholder={properties[key].description}
    type="range"
    min={properties[key].minimum}
    max={properties[key].maximum}
    step={step}
  />
);


module.exports = {
  checkbox,
  input,
  textfield,
  select,
  slider,
};
