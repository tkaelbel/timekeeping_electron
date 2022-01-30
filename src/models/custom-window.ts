type FileHandler = {
    readFile: (fileName: string) => Promise<string>;
    writeFile: (fileName: string, data: string) => Promise<void>;
};

export interface CustomWindow extends Window {
    fileHandler: FileHandler;
}