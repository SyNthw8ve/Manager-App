const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow } = electron;

let mainWindow;

function createWindow() {

  mainWindow = new BrowserWindow({width: 800, height: 600});

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

/*app.on('browser-window-created', (err, window) => {

  window.setMenu(null);
})*/
