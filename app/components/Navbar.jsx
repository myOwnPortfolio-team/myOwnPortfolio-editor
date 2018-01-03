import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';

const Navbar = (props) => {
  const moduleList = Object.keys(props.modules).map((key, index) => (
    <Menu.Item
      key={key}
      name={props.modules[key].name}
      onClick={() => props.handleClick(index, props.modules[key])}
      active={props.activeItem === index}
      link
    >
      <Icon name="address book outline" />
      <p className="item-title">{props.modules[key].name.replace('_', ' ')}</p>
    </Menu.Item>
  ));

  return (
    <Menu fluid vertical tabular className="container navbar">
      {moduleList}
    </Menu>
  );
};

module.exports = Navbar;
