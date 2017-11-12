import React from 'react';
import { Grid } from 'semantic-ui-react';

import Header from '../components/Header.jsx';
import Navbar from '../components/Navbar.jsx';
import Editor from '../components/Editor.jsx';

const EditionPage = props => (
  <div className="container app">
    <Header switchPage={page => props.switchPage(page)} />
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
