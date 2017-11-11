import React from 'react';

const Render = props => (
  <div>
    <iframe title="render" src={props.url} />
  </div>
);

module.exports = Render;
