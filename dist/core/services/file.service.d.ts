/// <reference types="node" />
interface fileCreated {
    readonly fileName: string;
    readonly filePath: string;
}
export declare class FilesService {
    createFile(file: {
        buffer: string | NodeJS.ArrayBufferView;
    }): Promise<fileCreated>;
    unlinkFile(filePath: string): Promise<void>;
}
export {};
