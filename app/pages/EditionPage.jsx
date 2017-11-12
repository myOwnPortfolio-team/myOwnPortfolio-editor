import React from 'react';
import { Grid, Button } from 'semantic-ui-react';

import Header from '../components/Header.jsx';
import Navbar from '../components/Navbar.jsx';
import Editor from '../components/Editor.jsx';

const headerItems = props => [(<Button primary onClick={() => props.switchPage('render')}>Compile</Button>)];

const EditionPage = props => (
  <div className="container edition-page">
    <Header switchPage={page => props.switchPage(page)} items={headerItems(props)} />
    <Grid>
      <Grid.Column width={3}>
        <Navbar
          modules={props.modules}
          activeItem={props.activeModule.name}
          handleClick={module => props.switchActiveModule(module)}
        />
      </Grid.Column>
      <Grid.Column stretched width={13}>
        <Editor module={props.activeModule} />
      </Grid.Column>
    </Grid>
  </div>
);

module.exports = EditionPage;
