import React from 'react';
import ReactDOM from 'react-dom';

import hello from './config/hello.json';

import './style/index.scss';

function HelloWorld(props) {
  let message;
  if (props.message) {
    message = props.message.message;
  }
  else {
    message = 'Loading error';
  }

  return (
    <h1>{message}</h1>
  );
}

// ========================================

ReactDOM.render(
  <HelloWorld message={hello} />,
  document.getElementById('root')
);