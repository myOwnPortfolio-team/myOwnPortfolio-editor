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
      if (this.props.module.schema[this.state.activeTab] !== null) {
        this.props.myOwnContent.modules[this.props.activeModuleIndex][this.state.activeTab] = contentTab;
      } else {
        this.props.myOwnContent.app_properties = contentTab;
      }
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
        return fields(
          this.props.appPropertiesSchema.properties,
          this.props.appPropertiesSchema.required,
          this.props.myOwnContent.app_properties,
          contentTab => this.updateContent(contentTab),
        );
      }
      if (this.state.activeTab === 'module') {
        return fields(
          this.props.moduleSettingSchema.properties,
          this.props.moduleSettingSchema.required,
          this.props.myOwnContent.modules[this.props.activeModuleIndex],
          contentTab => this.updateContent(contentTab),
        );
      }
      return fields(
        activeSchema.properties,
        activeSchema.required,
        this.props.myOwnContent.modules[this.props.activeModuleIndex][this.state.activeTab],
        contentTab => this.updateContent(contentTab),
      );
    };

    const menu = () => {
      if ((activeSchema !== null && activeSchema !== undefined) || this.state.activeTab === 'module') {
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
      <div className="container editor-content">
        {menu()}
        <Form className="form editor-content-under-menu">
          {editorContent()}
        </Form>
      </div>
    );
  }
}

module.exports = Editor;
