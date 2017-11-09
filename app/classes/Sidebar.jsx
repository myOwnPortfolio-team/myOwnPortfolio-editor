/* eslint no-console: off */

import React from 'react';
import { Sidebar, Segment, Menu, Icon } from 'semantic-ui-react';

import Editor from './Editor.jsx';

const createModule = (module) => {
  console.log(module);
};

const generateModules = modules => modules.map(module => (
  <Menu.Item
    key={module.name}
    name="address book outline"
    onClick={() => createModule(module)}
    link
  >
    <Icon name="address book outline" />
    {module.name}
  </Menu.Item>
));


class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
  }

  render() {
    return (
      <div className="app">
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation="push"
            width="thin"
            visible={this.state.visible}
            icon="labeled"
            vertical
            inverted
          >
            {generateModules(this.props.modules)}
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
              <Editor />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

module.exports = SideBar;
