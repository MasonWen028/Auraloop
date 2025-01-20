const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 700,
    minWidth: 1000,
    minHeight: 600,
    frame: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'), // Use a preload script for secure IPC
      contextIsolation: true,
      nodeIntegration: true,
    },
  });

  mainWindow.on('maximize', () => {
    mainWindow.webContents.send('window-state', 'maximized');
  });

  mainWindow.on('unmaximize', () => {
    mainWindow.webContents.send('window-state', 'unmaximized');
  });

  mainWindow.loadURL('http://localhost:5173'); // Vite's default dev server URL

  mainWindow.webContents.openDevTools({ mode: 'detach' });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('window-control', (event, action) => {
  switch (action) {
    case 'minimize':
      mainWindow.minimize();
      break;
    case 'maximize':
      if (mainWindow.isMaximized()) {
        mainWindow.unmaximize();
      } else {
        mainWindow.maximize();
      }
      break;
    case 'close':
      mainWindow.close();
      break;
  }
});
