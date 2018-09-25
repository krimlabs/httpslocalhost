const electron = require('electron');
const {setupMainHandler} = require('eiphop');

const proxyActions = require('./actions/proxy');

setupMainHandler(electron, {...proxyActions}, true);
