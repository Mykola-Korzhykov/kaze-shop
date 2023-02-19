import { Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
export declare class CorsMiddleware implements NestMiddleware {
    readonly Logger: Logger;
    use(req: Request, res: Response, next: NextFunction): void | Response<any, Record<string, any>>;
    private isEmpty;
}