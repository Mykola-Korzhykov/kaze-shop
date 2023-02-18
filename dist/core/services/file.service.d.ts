/// <reference types="node" />
/// <reference types="multer" />
import { Request } from 'express';
interface fileCreated {
    readonly fileName: string;
    readonly filePath: string;
}
export declare class FilesService {
    createFile(file: {
        buffer: string | NodeJS.ArrayBufferView;
    }): Promise<fileCreated>;
    unlinkFile(filePath: string): Promise<void>;
    createfileName(req: Request, file: Express.Multer.File, callback: any): void;
    fileFilter(req: Request, file: Express.Multer.File, callback: (error: Error, acceptFile: boolean) => void): void;
    destination(req: Request, file: Express.Multer.File, callback: (error: Error, destination: string) => void): void;
}
export {};
