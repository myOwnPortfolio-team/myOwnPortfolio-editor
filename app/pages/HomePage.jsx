import React from 'react';
import { Button } from 'semantic-ui-react';

import Header from '../components/Header.jsx';

const EditionPage = props => (
  <div className="container home-page">
    <Header switchPage={page => props.switchPage(page)} />
    <div className="page-content">
      <h1>My Own Portfolio Editor</h1>
      <div className="description">
        Put some information here:<br />
        Has autem provincias, quas Orontes ambiens amnis imosque pedes Cassii
        montis illius celsi praetermeans funditur in Parthenium mare, Gnaeus
        Pompeius superato Tigrane regnis Armeniorum abstractas dicioni Romanae
        coniunxit.
      </div>
      <Button.Group>
        <Button primary onClick={() => props.switchPage('edition')}>Edit a portfolio</Button>
        <Button.Or />
        <Button secondary onClick={() => props.switchPage('render')}>Get the last compilation</Button>
      </Button.Group>
    </div>
  </div>
);

module.exports = EditionPage;
