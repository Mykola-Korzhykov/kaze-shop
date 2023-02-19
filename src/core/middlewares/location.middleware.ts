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
      const data = reader.country(req.ip);
      const geo = geoip.lookup(req.headers['x-forwarded-for'][0]);
      console.log(geo, ipAddress);
      req['countryIsoCode'] = data.country.isoCode;
      req['CLient-IP'] = data.traits.ipAddress;
      req['CLient-Network'] = data.traits.network;
      req['user-type'] = data.traits.userType;
      res.setHeader('Client-IP-Address', `${data.traits.ipAddress}`);
      res.setHeader('Client-Network', `${data.traits.network}`);
      res.setHeader('Client-Location', `${data.country.isoCode}`);
      res.setHeader('Client-userType', `${data.traits.userType}`);
      return next();
    })();
  }
}
