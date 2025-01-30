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
    resizable: true,
    webPreferences: {
      experimentalFeatures: true,
      preload: path.join(__dirname, 'preload.cjs'), // Use a preload script for secure IPC
      contextIsolation: true,
      nodeIntegration: true,
      backgroundThrottling: false
    },
    visualEffectState: 'active',
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

app.disableHardwareAcceleration(false);

app.commandLine.appendSwitch('enable-transparent-visuals');
app.commandLine.appendSwitch('disable-gpu', false);


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

ipcMain.on('update-background-color', (event, newColor) => {
  if (BrowserWindow.getAllWindows().length > 0) {
    const mainWindow = BrowserWindow.getAllWindows()[0]; // Assuming a single window app
    mainWindow.setBackgroundColor(newColor); // Dynamically set the background color
  }
});
