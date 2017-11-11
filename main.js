// Load modules
const electron = require('electron');
const url = require('url');
const path = require('path');
const properties = require('./properties/electron.json');

// Electron
const { app } = electron;
const { BrowserWindow } = electron;

// Constant variables
const applicationTitle = 'My Own Portfolio';
const splashScreenURL = url.format({
  protocol: 'file',
  slashes: true,
  pathname: path.join(__dirname, properties.url.splash),
});
const applicationURL = url.format({
  protocol: 'file',
  slashes: true,
  pathname: path.join(__dirname, properties.url.index),
});
const iconURL = path.join(__dirname, properties.url.icon);

// Window variables
let splash;
let applicationWindow;

function createApplicationWindow() {
  // Create splash screen
  applicationWindow = new BrowserWindow({
    title: applicationTitle,
    width: 800,
    height: 600,
    minimizable: true,
    maximizable: true,
    frame: true,
    show: false,
    icon: iconURL,
  });

  applicationWindow.loadURL(applicationURL);

  // Event launched when the window is ready
  applicationWindow.once('ready-to-show', () => {
    // Show Window
    applicationWindow.show();
    if (splash) {
      splash.close();
    }
  });

  // Envent launched when the window is closed
  applicationWindow.on('closed', () => {
    applicationWindow = null;
  });
}

function createSplashScreen() {
  // Create splash screen
  splash = new BrowserWindow({
    title: applicationTitle,
    width: 200,
    height: 400,
    minimizable: false,
    maximizable: false,
    frame: false,
    show: false,
    icon: iconURL,
  });

  splash.loadURL(splashScreenURL);

  // Event launched when the window is ready
  splash.once('ready-to-show', () => {
    // Show Window
    splash.show();
  });

  // Event launched when the window is showed
  splash.on('show', () => {
    // Loading operations
    setTimeout(() => {
      createApplicationWindow();
    }, 5000);
  });

  // Envent launched when the window is closed
  splash.on('closed', () => {
    splash = null;
  });
}

// Setting first window to be showed by app
app.on('ready', createSplashScreen);

// Quit when all windows are closed
app.on('window-all-closed', () => {
  // OS X specific code
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Start application
app.on('activate', () => {
  // OS X specific code
  if (process.platform !== 'darwin') {
    if (splash === null && applicationWindow === null) {
      createSplashScreen();
    }
  }
});
