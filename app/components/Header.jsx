import React from 'react';
import { Menu, Button } from 'semantic-ui-react';

const Header = () => (
  <Menu>
    <Menu.Item header>
      <img src="./assets/icons/logo.svg" alt="My own Portfolio" />
    </Menu.Item>
    <Menu.Menu position="right">
      <Menu.Item>
        <Button primary>Compile</Button>
      </Menu.Item>
    </Menu.Menu>
  </Menu>
);

module.exports = Header;
