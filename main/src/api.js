const electron = require('electron');
const {setupMainHandler} = require('eiphop');

const proxyActions = require('./actions/proxy');
const certificateActions = require('./actions/certificate');

setupMainHandler(electron, {...proxyActions, ...certificateActions}, true);
