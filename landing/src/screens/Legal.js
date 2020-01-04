import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import Privacy from 'screens/legal/Privacy';
import Terms from 'screens/legal/Terms';
import Cookies from 'screens/legal/Cookies';

const Legal = ({match}) => {
  return (<Switch>
    <Route exact path={match.url} component={() => <Redirect to={`${match.url}/terms`} />} />
    <Route path={`${match.url}/terms`} component={Terms} />
    <Route path={`${match.url}/privacy`} component={Privacy} />
    <Route path={`${match.url}/cookies`} component={Cookies} />
  </Switch>);
};

export default Legal;
