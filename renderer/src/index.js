import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route} from 'react-router-dom';
import {setupFrontendListener} from 'eiphop';

import 'index.css';
import 'assets/tachyons.min.css';
import Proxies from 'screens/Proxies';
import Container from 'components/Container';

// listen to ipc responses
const electron = window.electron;
setupFrontendListener(electron);

// log to console from main
electron.ipcRenderer.on('rLog', (message) => {
  console.log(message);
});

const App = () => {
  return (<HashRouter>
    <Container>
      <Route exact path='/' component={Proxies} />
    </Container>
  </HashRouter>);
};

ReactDOM.render(<App />, document.getElementById('root'));