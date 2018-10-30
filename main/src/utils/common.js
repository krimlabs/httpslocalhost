const {app} = require('electron');
const childProcess = require('child-process-promise');

const userDataPath = `${process.env.NODE_ENV === 'dev' ? '.' : app.getAppPath('userData')}`;
const tmpPath = `${userDataPath}/tmp`;

// create tmp folder if it doesn't already exist
childProcess.exec(`mkdir -p ${tmpPath}`);

module.exports = {tmpPath, userDataPath};