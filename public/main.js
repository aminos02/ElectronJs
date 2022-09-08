const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

const ipc=electron.ipcMain;
const dialog=electron.dialog;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 800, height: 600,webPreferences: {
        nodeIntegration: true
    }});

    // build Phase: load the index.html of the app.
    // const startUrl = process.env.ELECTRON_START_URL || url.format({
    //     pathname: path.join(__dirname, '/../build/index.html'),
    //     protocol: 'file:',
    //     slashes: true
    // });
    const startUrl= isDev? 'http://localhost:3000':`file://${path.join(__dirname, '../build/index.html')}`

    mainWindow.loadURL(startUrl);
    if (isDev) {
        mainWindow.webContents.openDevTools({ mode: 'detach' });
      }
 
    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        mainWindow = null
    })
}



app.on('ready', createWindow); // or 

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});

