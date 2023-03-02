import { Injectable, NestMiddleware, Scope } from '@nestjs/common';
import { raw } from 'body-parser';

@Injectable({ scope: Scope.REQUEST })
export class FileBufferMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void): any {
    raw({
      verify: (req, res, buffer) => {
        req['fileBuffer'] = buffer;
      },
      limit: '5mb',
    })(req, res as any, next);
  }
}
