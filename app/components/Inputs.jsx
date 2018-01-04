import React from 'react';
import { Checkbox, Form, Input, Select, TextArea } from 'semantic-ui-react';

const checkbox = (properties, key, value, updateField, isRequired) => (
  <div>
    <div>{key.replace(/_/g, ' ')}</div>
    <Form.Field
      control={Checkbox}
      label={properties[key].description}
      checked={value}
      onChange={(e, data) => updateField(data.checked, key)}
      required={isRequired}
    />
  </div>
);

const input = (properties, key, value, type, updateField, isRequired) => (
  <Form.Field
    control={Input}
    label={key.replace(/_/g, ' ')}
    placeholder={properties[key].description}
    type={type}
    value={value}
    onChange={e => updateField(e.target.value, key)}
    required={isRequired}
  />
);

const textfield = (properties, key, value, updateField, isRequired) => (
  <Form.Field
    control={TextArea}
    label={key.replace(/_/g, ' ')}
    placeholder={properties[key].description}
    value={value}
    onChange={e => updateField(e.target.value, key)}
    required={isRequired}
  />
);

const select = (properties, key, value, options, updateField, isRequired) => (
  <Form.Field
    control={Select}
    label={key.replace(/_/g, ' ')}
    placeholder={properties[key].description}
    options={options}
    value={value}
    onChange={(e, data) => updateField(data.value, key)}
    required={isRequired}
  />
);

const slider = (properties, key, value, step, updateField, isRequired) => (
  <div>
    <Form.Field
      control={Input}
      label={`${key.replace(/_/g, ' ')}: ${value}`}
      placeholder={properties[key].description}
      type="range"
      min={properties[key].minimum}
      max={properties[key].maximum}
      step={step}
      value={value}
      onChange={e => updateField(e.target.value, key)}
      required={isRequired}
    />
  </div>
);


module.exports = {
  checkbox,
  input,
  textfield,
  select,
  slider,
};
