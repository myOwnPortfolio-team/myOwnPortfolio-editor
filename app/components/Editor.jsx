import React from 'react';
import { Form, Menu } from 'semantic-ui-react';
import fields from './Fields.jsx';

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
    const editorContent = () => {
      const activeSchema = this.props.module.schema[this.state.activeTab];
      if (activeSchema === null) {
        return (<div className="editor-empty-content">Create your own porfolio</div>);
      }
      return fields(activeSchema.properties, activeSchema.required);
    };

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

        <div className="form editor-content">
          <Form className="form editor-content">
            {editorContent()}
          </Form>
        </div>
      </div>
    );
  }
}

module.exports = Editor;
