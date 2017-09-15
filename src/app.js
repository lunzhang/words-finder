import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';
import store from './store.js';
import Main from './containers/main.js';

// render app
render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Main}>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app'),
);
