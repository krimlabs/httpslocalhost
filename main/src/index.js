const {app, BrowserWindow} = require('electron');
const sudo = require('sudo-prompt');

const proxyServer = require('./proxyServer');
const api = require('./api')

let win;

function createWindow () {
  win = new BrowserWindow({
    width: 800, height: 600, transparent: false,
    webPreferences: {
      nodeIntegration: false,
      preload: __dirname + '/utils/preload.js'
  }});

  win.loadURL('http://localhost:3000');
  proxyServer.start();
  
  win.webContents.openDevTools();

  win.on('closed', () => {  
    win = null
  });
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }

  proxyServer.stop();
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})