import {
  Injectable,
  NestMiddleware,
  Next,
  Req,
  Res,
  Scope,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class UserMiddleware implements NestMiddleware {
  use(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    try {
      const userAgent = req.headers['user-agent'];
      res.setHeader('Access-Control-Request-Headers', 'Authorization');
      res.setHeader('Access-Control-Request-Method', 'POST, GET, PUT, PATCH');
      res.setHeader('Timing-Allow-Origin', `${process.env.CLIENT_URL.trim()}`);
      res.setHeader('X-Content-Type-Options', 'nosniff');
      req['userAgent'] = userAgent;
      return next();
    } catch (err: unknown) {
      return next(err);
    }
  }
};