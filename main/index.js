const { app, BrowserWindow } = require('electron')
const path = require('path')
const { format, URL } = require('url')
const isDev = process.env.isDev
const loadPath = isDev ? new URL('http://localhost:3000') : new URL(
    format({
      pathname: join(app.getAppPath(), './dist/renderer/index.html'),
      protocol: 'file:',
      slashes: true,
    })
  )
function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadURL(loadPath.toString())
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})