import React from 'react';

import Header from '../components/Header.jsx';
import Render from '../components/Render.jsx';


const EditionPage = props => (
  <div className="container render-page">
    <Header switchPage={page => props.switchPage(page)} />
    <Render url="http://thibault.theologien.fr" />
  </div>
);

module.exports = EditionPage;
