import React from 'react';
import {hydrate, render} from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import 'index.css';
import 'assets/tachyons.min.css';

import Landing from 'screens/Landing';
import Legal from 'screens/Legal'
import CookieBanner from 'components/CookieBanner';

const App = () => {
  return (<BrowserRouter>
    <React.Fragment>
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/legal' component={Legal} />
      </Switch>
      <CookieBanner />
    </React.Fragment>
  </BrowserRouter>);
};

const rootElement = document.getElementById('root');

if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}

