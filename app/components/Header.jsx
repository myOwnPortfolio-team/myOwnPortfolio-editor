import React from 'react';
import { Menu, Button } from 'semantic-ui-react';

const Header = props => (
  <Menu>
    <Menu.Item header>
      <img src="./assets/icons/logo.svg" alt="My own Portfolio" />
    </Menu.Item>
    <Menu.Menu position="right">
      <Menu.Item>
        <Button primary click={props.handleCompilation}>Compile</Button>
      </Menu.Item>
    </Menu.Menu>
  </Menu>
);

module.exports = Header;
