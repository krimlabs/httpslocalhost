const {app, BrowserWindow} = require('electron');
const sudo = require('sudo-prompt');

const api = require('./api')
const db = require('./db');

let win;

const createWindow = () => {
  win = new BrowserWindow({
    frame: false,
    width: 800, height: 600, transparent: false,
    webPreferences: {
      nodeIntegration: false,
      preload: __dirname + '/utils/preload.js'
  }});

  win.setResizable(false)

  win.loadURL('http://localhost:3000');
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
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})