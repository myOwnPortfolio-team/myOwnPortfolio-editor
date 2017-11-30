import React from 'react';
import { Form, Menu } from 'semantic-ui-react';
import Fields from './Fields.jsx';

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
    let fields = null;
    if (this.props.module.schema[this.state.activeTab]) {
      fields = Fields(
        this.props.module.schema[this.state.activeTab].properties,
        this.props.module.schema[this.state.activeTab].required,
      );
    }

    return (
      <div className="container editor">
        <Menu attached="top" tabular>
          <Menu.Item
            name="Content"
            active={this.state.activeTab === 'content'}
            onClick={(e, { name }) => this.handleTabClick(name)}
          />
          <Menu.Item
            name="Properties"
            active={this.state.activeTab === 'properties'}
            onClick={(e, { name }) => this.handleTabClick(name)}
          />
          <Menu.Item
            name="Style"
            active={this.state.activeTab === 'style'}
            onClick={(e, { name }) => this.handleTabClick(name)}
          />
        </Menu>

        <div className="form">
          <Form>
            {fields}
          </Form>
        </div>
      </div>
    );
  }
}

module.exports = Editor;
