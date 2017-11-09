/* eslint no-console: off */

import React from 'react';
import { Sidebar, Segment, Menu, Icon } from 'semantic-ui-react';

const createModule = (module) => {
  console.log(module);
};

const moduleList = modules => modules.map(module => (
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

const SideBar = props => (
  <div className="container">
    <Sidebar.Pushable as={Segment}>
      <Sidebar
        as={Menu}
        animation="push"
        width="thin"
        visible
        icon="labeled"
        vertical
        inverted
      >
        {moduleList(props.modules)}
      </Sidebar>
      <Sidebar.Pusher>
        <Segment basic>
          {props.children}
        </Segment>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  </div>
);

module.exports = SideBar;
