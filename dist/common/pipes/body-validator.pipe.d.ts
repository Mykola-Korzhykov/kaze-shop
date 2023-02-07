import { Request, Response, NextFunction } from 'express';
import { ClassConstructor } from 'class-transformer';
export default class RequestValidator {
    static validate: <T extends object>(classInstance: ClassConstructor<T>) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
