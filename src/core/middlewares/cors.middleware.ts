import {
  BadRequestException,
  Injectable,
  Logger,
  NestMiddleware,
  Next,
  Req,
  Res,
  Scope,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import geoip from 'geoip-lite';
import IP from 'ip';
interface RequestHeaders {
  Accept?: string;
  Host?: string;
  Connection?: string;
  [key: string]: string;
}

@Injectable({ scope: Scope.REQUEST })
export class CorsMiddleware implements NestMiddleware {
  readonly Logger = new Logger(CorsMiddleware.name);
  use(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    const headers: RequestHeaders = JSON.parse(JSON.stringify(req.headers));
    const isEmpty = this.isEmpty(headers);
    const geo = geoip.reloadDataSync();
    const ipAddress = IP.address();
    this.Logger.log(geo);
    this.Logger.log(ipAddress);
    this.Logger.log(req.headers['x-forwarded-for']);
    if (isEmpty) {
      throw new BadRequestException({
        message: 'No request headers were provided!',
      });
    }
    res.setHeader(
      'Access-Control-Allow-Origin',
      `${process.env.CLIENT_URL.toString().trim()}`,
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE',
    );
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.header(
      'Access-Control-Allow-Headers',
      'imageType, Authorization, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept',
    );
    res.setHeader('X-Frame-Options', 'deny');
    res.setHeader(
      'Cache-Control',
      'no-store, no-cache, must-revalidate, max-age=0, s-maxage=0',
    );
    res.setHeader('Expires', '0');
    res.setHeader('Strict-Transport-Security', 'max-age=5184000,preload');
    res.setHeader(
      'Content-Security-Policy',
      `default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'`,
    );
    res.setHeader(
      'X-Content-Security-Policy',
      `default-src 'self'; script-src 'self'; object-src 'self'; style-src 'self'; img - src 'self' data:; media - src 'self'; frame - src 'self'; font - src 'self'; connect - src 'self'`,
    );
    res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
    res.setHeader('X-DNS-Prefetch-Control', 'off');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader(
      'X-WebKit-CSP',
      `default-src 'self'; script-src 'self'; object-src 'self'; style-src 'self'; img-src 'self' data:; media-src 'self'; frame-src 'self'; font-src 'self'; connect-src 'self'`,
    );
    res.removeHeader('server');
    res.removeHeader('X-Powered-By');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    if (req.method === 'OPTIONS') {
      return res.status(204).end();
    }
    return next();
  }

  private isEmpty(object: RequestHeaders): boolean {
    for (const prop in object) {
      if (Object.prototype.hasOwnProperty.call(object, prop)) {
        return false;
      }
    }
    return JSON.stringify(object) === JSON.stringify({});
  }
}
