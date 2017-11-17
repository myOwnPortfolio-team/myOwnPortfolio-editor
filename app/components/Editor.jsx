import React from 'react';
import { Form, Menu } from 'semantic-ui-react';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'content',
    };
  }

  handleTabClick(tab) {
    this.setState({ activeTab: tab.toLowerCase() });
  }

  render() {
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

    const animationOptions = [
      { key: '0', text: '0', value: '0' },
      { key: '1', text: '1', value: '1' },
    ];

    const fields = properties => Object.keys(properties).map((key, index) => {
      switch (properties[key].type) {
        case 'integer':
          switch (properties[key].input) {
            case 'slider':
              return slider(properties, key, index);
            default:
              return slider(properties, key, index);
          }
        case 'number':
          switch (properties[key].input) {
            case 'slider':
              return slider(properties, key, index);
            default:
              return slider(properties, key, index);
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

    return (
      <div className="container editor">
        <Menu attached="top" tabular>
          <Menu.Item name="Content" active={this.state.activeTab === 'content'} onClick={(e, { name }) => this.handleTabClick(name)} />
          <Menu.Item name="Properties" active={this.state.activeTab === 'properties'} onClick={(e, { name }) => this.handleTabClick(name)} />
          <Menu.Item name="Style" active={this.state.activeTab === 'style'} onClick={(e, { name }) => this.handleTabClick(name)} />
        </Menu>

        <div className="form">
          <Form>
            {fields(this.props.module[this.state.activeTab].properties)}
          </Form>
        </div>
      </div>
    );
  }
}

module.exports = Editor;
