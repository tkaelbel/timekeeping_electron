import { ipcMain } from 'electron';
import { writeFileSync, readFileSync } from 'fs';

export function useFileHandler() {
  ipcMain.handle('fileHandler:readFile', async (event, path) => {
    return readFileSync(path, 'utf8');
  });

  ipcMain.handle('fileHandler:writeFile', async (event, path, data) => {
    return writeFileSync(path, data);
  });
}
