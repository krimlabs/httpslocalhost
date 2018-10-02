import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import {setupFrontendListener} from 'eiphop';

import 'index.css';
import 'assets/tachyons.min.css';
import Loading from 'screens/Loading';
import Proxies from 'screens/Proxies';
import Onboarding from 'screens/Onboarding';
import Container from 'components/Container';

// listen to ipc responses
const electron = window.electron;
setupFrontendListener(electron);

const App = () => {
  return (<BrowserRouter>
    <Container>
      <Route exact path='/' component={Loading} />
      <Route exact path='/onboarding' component={Onboarding} />
      <Route exact path='/proxies' component={Proxies} />
    </Container>
  </BrowserRouter>);
};

ReactDOM.render(<App />, document.getElementById('root'));