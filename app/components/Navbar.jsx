import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';

const Navbar = (props) => {
  const moduleList = props.modules.map(module => (
    <Menu.Item
      key={module.name}
      name={module.name}
      onClick={() => props.handleClick(module)}
      active={props.activeItem === module.name}
      link
    >
      <Icon name="address book outline" />
      {module.name}
    </Menu.Item>
  ));

  return (
    <Menu fluid vertical tabular className="container">
      {moduleList}
    </Menu>
  );
};

module.exports = Navbar;
