const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

const api = require('./api')
const db = require('./db')
const {userDataPath} = require('./utils/common')

const http = require('http')
const log = (msg) => {
  http.get(`http://localhost:8080/?msg=${msg}`)
}

let win;
log('---> start')
const createWindow = () => {
  win = new BrowserWindow({
    titleBarStyle: 'hidden',
    width: process.env.NODE_ENV === 'dev' ? 880 : 881, height: 600,
    webPreferences: {
      nodeIntegration: false,
      preload: __dirname + '/utils/preload.js'
  }});

  win.setResizable(false)
  if (process.env.NODE_ENV === 'dev') {
    win.loadURL('http://localhost:3000')
    win.webContents.openDevTools()
  } else {
    log("---> dirname " + __dirname)
    log(`file://${process.resourcesPath}/build/html/index.html`)
    win.loadURL(`file://${process.resourcesPath}/build/html/index.html`);
    win.webContents.openDevTools()
  }

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