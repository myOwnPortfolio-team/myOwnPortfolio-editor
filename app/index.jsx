/* global document */

import React from 'react';
import ReactDOM from 'react-dom';

import hello from './config/hello.json';

import './style/index.scss';

function HelloWorld(props) {
  let message;
  if (props.message && props.message['hello-message']) message = props.message['hello-message'];
  else message = 'Error';

  return (
    <h1>{message}</h1>
  );
}

// ========================================

ReactDOM.render(
  <HelloWorld message={hello} />,
  document.getElementById('root'),
);
