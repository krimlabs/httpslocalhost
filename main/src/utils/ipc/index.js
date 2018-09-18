const log = require('./log');
const {ipcMain} = require('electron');

const setupMainHandler = (availableActions, enableLogs=false) => {
  enableLogs && log.info('Logs enabled !');
  ipcMain.on('asyncRequest', (event, requestId, action, payload) => {
    enableLogs && log.info(`Got new request with id = ${requestId}, action = ${action}`, payload);
    const requestedAction = availableActions[action];
    if (!requestedAction) {
      const error = `Action "${action}" is not available. Did you forget to define it ?`;
      log.error(error)
      event.sender.send('errorResponse', {msg: error});
      return;
    }

    requestedAction({payload}, {
      send: (res) => event.sender.send('asyncResponse', requestId, res),
      error: (err) => event.sender.send('errorResponse', requestId, err)
    });

    return;
  })
};

module.exports = {setupMainHandler};
