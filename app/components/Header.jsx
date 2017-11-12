import React from 'react';
import { Menu, Button } from 'semantic-ui-react';

const Header = props => (
  <Menu>
    <Menu.Item header onClick={() => props.switchPage('editor')}>
      <img src="./assets/icons/logo.svg" alt="My own Portfolio" />
    </Menu.Item>
    <Menu.Menu position="right">
      <Menu.Item>
        <Button primary onClick={() => props.switchPage('render')}>Compile</Button>
      </Menu.Item>
    </Menu.Menu>
  </Menu>
);

module.exports = Header;
