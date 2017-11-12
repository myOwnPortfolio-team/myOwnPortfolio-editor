import React from 'react';
import { Button } from 'semantic-ui-react';

import Header from '../components/Header.jsx';
import Render from '../components/Render.jsx';

const headerItems = props => [
  (<Button onClick={() => props.switchPage('edition')}>Go back</Button>),
  (<Button primary>Download archive</Button>),
  (<Button primary>Upload on GitHub</Button>),
];

const EditionPage = props => (
  <div className="container render-page">
    <Header switchPage={page => props.switchPage(page)} items={headerItems(props)} />
    <Render url="http://thibault.theologien.fr" />
  </div>
);

module.exports = EditionPage;
