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
    const properties = this.props.module[this.state.activeTab].properties;

    const checkbox = (key, index, type) => (
      <Form.Checkbox key={index} placeholder={properties[key].description} />
    );

    const input = (key, index, type) => (
      <Form.Field key={index}>
        <label htmlFor={index}>{key}</label>
        <input id={index} placeholder={properties[key].description} type={type} />
      </Form.Field>
    );

    const textfield = (key, index) => (
      <Form.Field key={index}>
        <Form.TextArea id={index} label={key} placeholder={properties[key].description} />
      </Form.Field>
    );

    const select = (key, index, options) => (
      <Form.Select
        key={index}
        label={key}
        options={options}
        placeholder={properties[key].description}
      />
    );

    const slider = (key, index) => (
      <Form.Field key={index}>
        <label htmlFor={index}>{key}</label>
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

    const fields = Object.keys(properties).map((key, index) => {
      switch (properties[key].type) {
        case 'integer':
          switch (properties[key].input) {
            case 'slider':
              return slider(key, index);
            default:
              return slider(key, index);
          }
        case 'string':
          switch (properties[key].input) {
            case 'color-picker':
              return input(key, index, 'color'); // TODO to implement
            case 'input-number':
              return input(key, index, 'number');
            case 'input-date':
              return input(key, index, 'date');
            case 'input-text':
              return input(key, index, 'text');
            case 'select-animation':
              return select(key, index, animationOptions); // TODO to implement
            case 'textfield':
              return textfield(key, index);
            case 'textfield-markdown':
              return textfield(key, index); // TODO to implement
            default:
              return input(key, index, 'text');
          }
        case 'boolean':
          switch (properties[key].input) {
            case 'checkbox':
              return checkbox(key, index);
            default:
              return checkbox(key, index);
          }
        default:
          return input(key, index, 'text');
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
          {JSON.stringify(this.props.module[this.state.activeTab])}
          <Form>
            {fields}
          </Form>
        </div>
      </div>
    );
  }
}

module.exports = Editor;
