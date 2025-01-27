// Extend the Window interface to include electronAPI
interface Window {
  electron: {
    minimize: () => void;
    maximize: () => void;
    close: () => void;
    ipcRenderer: Omit<Electron.IpcRenderer, 'removeListener'> &  {
      send: (channel: string, data?: any) => void;
      on: (channel: string, listener: (...args: any[]) => void) => void;
      once: (channel: string, listener: (...args: any[]) => void) => void;
      // Explicitly omitting `removeListener`
      // If attempted to use, it will show as missing from the type definition
    };
  };
  player: Howl
}
