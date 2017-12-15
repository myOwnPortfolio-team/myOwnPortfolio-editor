import React from 'react';
import { Button } from 'semantic-ui-react';

import Header from '../components/Header.jsx';
import Render from '../components/Render.jsx';

const headerItems = props => [
  (<Button circular name="back" icon="cancel" onClick={() => props.switchPage('edition')} />),
  (<Button circular name="download" icon="download" />),
  (<Button circular name="upload" icon="cloud upload" />),
];

const EditionPage = props => (
  <div className="container render-page">
    <Header switchPage={page => props.switchPage(page)} items={headerItems(props)} />
    <Render url="http://thibault.theologien.fr" />
  </div>
);

module.exports = EditionPage;
