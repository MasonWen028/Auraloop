const { app, BrowserWindow, ipcMain  } = require('electron');
const path = require('path');

let mainWindow;

const createMainWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1100,
        height: 720,
        frame: false,
        titleBarStyle: 'hidden',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // Optional
            nodeIntegration: true, // Use Node.js APIs in the renderer process
            contextIsolation: false,
        },
    });

    // Load React app in development
    mainWindow.loadURL('http://localhost:3000');

    // Uncomment this for production
    // mainWindow.loadFile(path.join(__dirname, 'frontend/build/index.html'));

    mainWindow.on('closed', () => (mainWindow = null));
};

app.on('ready', createMainWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (!mainWindow) createMainWindow();
});

ipcMain.on('window-minimize', () => {
    mainWindow.minimize();
});

ipcMain.on('window-maximize', () => {
    if (mainWindow.isMaximized()) {
        mainWindow.unmaximize();
    } else {
        mainWindow.maximize();
    }
});

ipcMain.on('window-close', () => {
    mainWindow.close();
});
