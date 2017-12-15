import React from 'react';
import { Form, Menu } from 'semantic-ui-react';
import { fields } from './Fields.jsx';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'content',
    };
  }

  updateContent(contentTab) {
    if (this.state.activeTab === 'module') {
      this.props.myOwnContent.modules[this.props.activeModuleIndex] = contentTab;
    } else {
      this.props.myOwnContent.modules[this.props.activeModuleIndex][this.state.activeTab] = contentTab;
    }
    this.setState({ myOwnContent: this.props.myOwnContent });
  }

  handleTabClick(tab) {
    this.setState({ activeTab: tab.toLowerCase() });
  }

  render() {
    const activeSchema = this.props.module.schema[this.state.activeTab];

    const editorContent = () => {
      if (activeSchema === null) {
        return (<div className="editor-empty-content">Create your own porfolio</div>);
      }
      if (this.state.activeTab === 'module') {
        return fields(
          this.props.moduleListSchema.items.properties,
          this.props.moduleListSchema.items.required,
          this.props.myOwnContent.modules[this.props.activeModuleIndex],
          contentTab => this.updateContent(contentTab),
        );
      };
      return fields(
        activeSchema.properties,
        activeSchema.required,
        this.props.myOwnContent.modules[this.props.activeModuleIndex][this.state.activeTab],
        contentTab => this.updateContent(contentTab),
      );
    };

    const menu = () => {
      if (activeSchema !== null || this.activeSchema === 'module') {
        return (
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
            <Menu.Item
              name="Module"
              active={this.state.activeTab === 'module'}
              onClick={(e, { name }) => this.handleTabClick(name)}
            />
          </Menu>
        );
      }
    };

    return (
      <div className="container editor">
        {menu()}
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
