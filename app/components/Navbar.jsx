import React from 'react';
import { Menu } from 'semantic-ui-react';

const Navbar = props => (
  <Menu fluid vertical tabular>
    <Menu.Item name="bio" active={props.activeItem === 'bio'} onClick={props.handleItemClick} />
    <Menu.Item name="pics" active={props.activeItem === 'pics'} onClick={props.handleItemClick} />
    <Menu.Item name="companies" active={props.activeItem === 'companies'} onClick={props.handleItemClick} />
    <Menu.Item name="links" active={props.activeItem === 'links'} onClick={props.handleItemClick} />
  </Menu>
);

module.exports = Navbar;
