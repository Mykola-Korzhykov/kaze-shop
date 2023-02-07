import { Observable } from 'rxjs';
import { Response } from 'express';
export declare class AppController {
    serveStatic(response: Response): Response<any, Record<string, any>>;
    sse(): Observable<MessageEvent>;
}
