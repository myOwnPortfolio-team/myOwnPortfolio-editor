import React from 'react';
import { Menu } from 'semantic-ui-react';

const Editor = props => (
  <div className="container editor">
    <Menu attached="top" tabular>
      <Menu.Item name="Content" />
      <Menu.Item name="Properties" />
      <Menu.Item name="Style" />
    </Menu>

    <h1>Edit module {props.module.name}</h1>
    <h2>Content</h2>
    {JSON.stringify(props.module.content)}
    <h2>Properties</h2>
    {JSON.stringify(props.module.properties)}
    <h2>Style</h2>
    {JSON.stringify(props.module.style)}
  </div>
);

module.exports = Editor;
