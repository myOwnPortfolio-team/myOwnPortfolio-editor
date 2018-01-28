/* eslint react/no-unused-state: "off" */

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

  handleTabClick(tab) {
    this.setState({ activeTab: tab.toLowerCase() });
  }

  render() {
    const activeSchema = this.props.module.schema[this.state.activeTab];

    const editorContent = () => {
      if (activeSchema === null) {
        return fields(
          this.props.appPropertiesSchema.properties,
          this.props.appPropertiesSchema.required,
          this.props.myOwnContent.app_properties,
          contentTab => this.props.updateContent(contentTab, undefined),
        );
      }
      if (this.state.activeTab === 'module') {
        return fields(
          this.props.moduleSettingSchema.properties,
          this.props.moduleSettingSchema.required,
          this.props.myOwnContent.modules[this.props.activeModuleIndex],
          contentTab => this.props.updateContent(contentTab, this.state.activeTab),
        );
      }
      return fields(
        activeSchema.properties,
        activeSchema.required,
        this.props.myOwnContent.modules[this.props.activeModuleIndex][this.state.activeTab],
        contentTab => this.props.updateContent(contentTab, this.state.activeTab),
      );
    };

    const menu = () => {
      if (activeSchema || this.state.activeTab === 'module') {
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
      return null;
    };

    const menuComponent = menu();
    const content = editorContent();

    return (
      <div className="container editor-content">
        {menuComponent}
        <Form className="form editor-content-under-menu">
          {content}
        </Form>
      </div>
    );
  }
}

module.exports = Editor;
