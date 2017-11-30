import React from 'react';
import SplashScreen from '../components/SplashScreen.jsx';

const LoadingPage = props => (
  <div className="splash-page">
    <SplashScreen database={props.database} version={props.version} />
  </div>
);

module.exports = LoadingPage;
