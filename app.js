const electron = require('electron');
const url = require('url');
const path = require('path');

const { app, BrowserWindow } = electron;

require('electron-reload')(__dirname);

let mainWindow;

function createWindow() {

  mainWindow = new BrowserWindow({width: 1366, height: 728, frame: true});

  mainWindow.loadURL(url.format({

    pathname: path.join(__dirname, 'src/views/index.html'),
    protocol: 'file',
    slashes: true

  }))

  mainWindow.webContents.openDevTools();

  mainWindow.on('close', () => {

    mainWindow = null;
  })
}

app.on('ready', createWindow )

app.on('browser-window-created', (err, window) => {

  window.setMenu(null);
})
