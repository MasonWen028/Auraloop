/**
 * Utility to detect if the app is running in an Electron environment or in the web browser.
 */

/**
 * Checks if the app is running in an Electron environment.
 * @returns {boolean} True if running in Electron, false otherwise.
 */
export const isElectron = (): boolean => {  
  return window.electron !== undefined && window.electron.ipcRenderer !== undefined;
};

/**
 * Checks if the app is running in a web browser environment.
 * @returns {boolean} True if running in a web browser, false otherwise.
 */
export const isWeb = (): boolean => {
  return !isElectron();
};
