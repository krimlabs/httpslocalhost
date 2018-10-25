import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import {setupFrontendListener} from 'eiphop';

import 'index.css';
import 'assets/tachyons.min.css';
import Proxies from 'screens/Proxies';
import Container from 'components/Container';

// listen to ipc responses
const electron = window.electron;
setupFrontendListener(electron);

const App = () => {
  return (<BrowserRouter>
    <Container>
      <Route exact path='/' component={Proxies} />
    </Container>
  </BrowserRouter>);
};

ReactDOM.render(<App />, document.getElementById('root'));