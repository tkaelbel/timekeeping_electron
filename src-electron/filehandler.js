import { ipcMain } from 'electron';
import { readFile, writeFile, readFileSync } from 'fs';

export function useFileHandler() {

    ipcMain.handle('fileHandler:readFile', async (event, path) => {
        return readFileSync(path, 'utf8');
    });

    ipcMain.handle('fileHandler:writeFile', async (event, path, data) => {
        return writeFile(path, data);
    });
};
