import { ipcMain } from 'electron';
import fs from 'fs';

export function useFileHandler() {
  ipcMain.handle('fileHandler:readFile', (event, path) => {
    return fs.promises.readFile(path, 'utf8');
  });

  ipcMain.handle('fileHandler:writeFile', (event, path, data) => {
    return fs.promises.writeFile(path, data);
  });
}
