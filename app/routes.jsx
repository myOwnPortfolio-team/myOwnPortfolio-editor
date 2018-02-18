import React from 'react';
import { Route } from 'react-router-dom';

import {
  EditionPage,
  HomePage,
  RenderPage,
  SplashPage,
} from './pages';

const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/edition',
    component: EditionPage,
  },
  {
    path: '/render',
    component: RenderPage,
  },
  {
    path: '/loading',
    component: SplashPage,
  },
];

const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    render={props => (
      <route.component {...props} routes={route.routes} />
    )}
  />
);

export default routes.map(route => <RouteWithSubRoutes key={`route${route.path}`} {...route} />);
