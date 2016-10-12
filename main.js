const electron = require('electron')
const path = require('path')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const client = require('electron-connect').client

const ipc = electron.ipcMain
const dialog = electron.dialog

function createWindow() {
  let mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  })

  mainWindow.loadURL(path.join('file://', __dirname, '/index.html'))

  client.create(mainWindow)
}

app.on('ready', createWindow)
ipc.on('open-file-dialog', function(event) {
  dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{
      name: 'Excel file', extensions: ['xlsx', 'xls']
    }]
  }, function(file) {
    if (file) {
      event.sender.send('selected-file', file)
    }
  })
})
