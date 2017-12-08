import React from 'react';
import { Checkbox, Form, Input, Select, TextArea } from 'semantic-ui-react';

const checkbox = (properties, key, index, value, updateField, isRequired) => (
  <div>
    <div>{key}</div>
    <Form.Field
      control={Checkbox}
      key={index}
      label={properties[key].description}
      checked={value}
      onChange={(e, data) => updateField(data.value, key)}
      required={isRequired}
    />
  </div>
);

const input = (properties, key, index, value, type, updateField, isRequired) => (
  <Form.Field
    control={Input}
    key={index}
    label={key}
    placeholder={properties[key].description}
    type={type}
    value={value}
    onChange={e => updateField(e.target.value, key)}
    required={isRequired}
  />
);

const textfield = (properties, key, index, value, isRequired) => (
  <Form.Field
    control={TextArea}
    key={index}
    label={key}
    placeholder={properties[key].description}
    value={value}
    required={isRequired}
  />
);

const select = (properties, key, index, value, options, updateField, isRequired) => (
  <Form.Field
    control={Select}
    key={index}
    label={key}
    placeholder={properties[key].description}
    options={options}
    value={value}
    onChange={(e, data) => updateField(data.value, key)}
    required={isRequired}
  />
);

const slider = (properties, key, index, value, step, updateField, isRequired) => (
  <div>
    <Form.Field
      control={Input}
      key={index}
      label={key}
      placeholder={properties[key].description}
      type="range"
      min={properties[key].minimum}
      max={properties[key].maximum}
      step={step}
      value={value}
      onChange={e => updateField(e.target.value, key)}
      required={isRequired}
    />
    <p>{value}</p>
  </div>
);


module.exports = {
  checkbox,
  input,
  textfield,
  select,
  slider,
};
