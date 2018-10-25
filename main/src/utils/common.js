const {app} = require('electron');

const tmpPath = `${process.env.NODE_ENV === 'dev' ? '.' : app.getAppPath('userData')}/tmp`;

module.exports = {tmpPath};