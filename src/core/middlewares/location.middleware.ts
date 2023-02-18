import {
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
import path from 'path';
import { Reader } from '@maxmind/geoip2-node';
@Injectable({ scope: Scope.REQUEST })
export class LocationMiddleware implements NestMiddleware {
  use(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    (async () => {
      const ipAddress = IP.address();
      const reader = await Reader.open(path.join(__dirname, 'GeoLite2-Country.mmdb'));
      const data = reader.country(ipAddress);
      const geo = geoip.lookup(ipAddress);
      console.log(geo, ipAddress);
      req['location'] = data.country.isoCode;
      res.setHeader('Location', `${req['location']}`);
      return next();
    })();
  }
}
