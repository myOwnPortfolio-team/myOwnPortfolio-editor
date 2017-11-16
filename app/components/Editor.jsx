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
    const inputs = Object.keys(properties).map((key, index) => (
      <Form.Field key={index}>
        <label>{key}</label>
        <input placeholder={properties[key].description} />
      </Form.Field>
    ));

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
            {inputs}
          </Form>
        </div>
      </div>
    );
  }
}

module.exports = Editor;
