const proxyActions = require('./actions/proxy');
const {setupMainHandler} = require('./utils/ipc');

setupMainHandler({...proxyActions}, true);
