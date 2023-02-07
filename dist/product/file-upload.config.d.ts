/// <reference types="express-serve-static-core" />
/// <reference types="multer" />
/// <reference types="compression" />
/// <reference types="cookie-parser" />
/// <reference types="csurf" />
import { Request } from 'express';
export declare const fileName: (req: Request, file: Express.Multer.File, callback: any) => void;
export declare const fileFilter: (req: Request, file: Express.Multer.File, callback: (error: Error, acceptFile: boolean) => void) => void;
export declare const destination: (req: Request, file: Express.Multer.File, callback: (error: Error, destination: string) => void) => void;
