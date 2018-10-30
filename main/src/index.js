const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

const api = require('./api')
const db = require('./db')

let win;

const createWindow = () => {
  win = new BrowserWindow({
    titleBarStyle: 'hidden',
    width: 880, height: 600,
    webPreferences: {
      nodeIntegration: false,
      preload: __dirname + '/utils/preload.js'
  }});

  win.setResizable(false)
  console.log(`file://${__dirname}/../build/html/index.html`);
  win.loadURL(`file://${__dirname}/../build/html/index.html`);
  // if (process.env.NODE_ENV === 'dev') {
  //   win.loadURL('http://localhost:3000');  
  // } else {
  //   win.loadURL(`file://${__dirname}/built_ui/index.html`);
  // }
  
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