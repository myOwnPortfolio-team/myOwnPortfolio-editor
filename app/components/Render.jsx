import React from 'react';
import Iframe from 'react-iframe';

const Render = props => (
  <div>
    <Iframe
      url={props.url}
      width="100%"
      height="100%"
    />
  </div>
);

module.exports = Render;
