const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

// Keep a global reference to the window and avoid it to be garbage collected
let win;

function createWindow () {
  // Create window
  win = new BrowserWindow({width: 800, height: 600});

  // Entry point
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'public/index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Actions to do when the window is closed
  win.on('closed', () => {
    win = null;
  });
}

// Call the function when electron has finished initialization
app.on('ready', createWindow);

// Close app when all windows are closed
app.on('window-all-closed', () => {
  // macOS specific code
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // macOS specific code
  if (win === null) {
    createWindow();
  }
});