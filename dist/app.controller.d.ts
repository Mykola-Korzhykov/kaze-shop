import { Observable } from 'rxjs';
import { NextFunction, Request, Response } from 'express';
export declare class AppController {
    private readonly Logger;
    set(request: Request, response: Response, next: NextFunction): void;
    getLocation(request: Request, response: Response, next: NextFunction): void;
    sse(): Observable<MessageEvent>;
    private generateEncryptedValue;
}
