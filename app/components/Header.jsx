import React from 'react';
import { Menu, Button } from 'semantic-ui-react';

const Header = props => (
  <Menu>
    <Menu.Item header onClick={() => props.switchPage('home')}>
      <img src="./assets/icons/logo.svg" alt="My own Portfolio" />
    </Menu.Item>
    <Menu.Menu position="right">
      {props.items}
      <Menu.Item>
        <Button positive >Sign In</Button>
      </Menu.Item>
    </Menu.Menu>
  </Menu>
);

module.exports = Header;
