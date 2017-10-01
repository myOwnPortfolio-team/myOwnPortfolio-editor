import React from 'react';
import ReactDOM from 'react-dom';

import '../css/index.scss';

function HelloWorld() {
  return (
    <h1>Hello World !</h1>
  );
}

// ========================================

ReactDOM.render(
  <HelloWorld />,
  document.getElementById('root')
);