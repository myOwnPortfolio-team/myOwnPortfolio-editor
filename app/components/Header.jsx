import React from 'react';
import { Menu } from 'semantic-ui-react';

const renderItems = (items) => {
  if (items) {
    return items.map(item => <Menu.Item key={item.props.name}>{item}</Menu.Item>);
  }
  return null;
};

const Header = props => (
  <Menu>
    <Menu.Item header onClick={() => props.switchPage('home')}>
      <img src="./assets/icons/logo.svg" alt="My own Portfolio" />
    </Menu.Item>
    <Menu.Menu position="right">
      {renderItems(props.items)}
    </Menu.Menu>
  </Menu>
);

module.exports = Header;
