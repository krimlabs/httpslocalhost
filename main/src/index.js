const {app, BrowserWindow} = require('electron');
const api = require('./api')

let win;

function createWindow () {
  win = new BrowserWindow({
    width: 800, height: 600, transparent: false,
    webPreferences: {
      nodeIntegration: false,
      preload: __dirname + '/preload.js'
  }});

  win.loadURL('http://localhost:3000');
  
  win.webContents.openDevTools();

  win.on('closed', () => {  
    win = null
  })
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