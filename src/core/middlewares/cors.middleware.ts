import {
  BadRequestException,
  Injectable,
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
  use(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    const headers: RequestHeaders = JSON.parse(JSON.stringify(req.headers));
    const isEmpty = this.isEmpty(headers);
    const ipAddress = IP.address();
    const geo = geoip.lookup(ipAddress);
    console.log(geo, ipAddress);
    const requesAPI = req.ip;
    req['region'] = 'ua'; 
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
    res.setHeader(
      'Content-Security-Policy',
      'default-src \'self\'; font-src \'self\'; img-src \'self\'; script-src \'self\'; style-src \'self\'; frame-src \'self\'',
    );
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
