import {
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
import path from 'path';
import { Reader } from '@maxmind/geoip2-node';
import { CurrencyService } from '../../owner/services/currency.service';
import getSymbolFromCurrency from 'currency-symbol-map';
import countryToCurrency from 'country-to-currency';
@Injectable({ scope: Scope.REQUEST })
export class LocationMiddleware implements NestMiddleware {
  private readonly Logger = new Logger(LocationMiddleware.name);
  constructor(private readonly currencyService: CurrencyService){}
  use(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    (async () => {
      try {
        const ipAddress = IP.address();
        const reader = await Reader.open(path.join(__dirname, 'GeoLite2-Country.mmdb'));
        const data = reader.country(req.ip);
        const geo = geoip.lookup(req.ip);
        this.Logger.log(geo, ipAddress);
        req['countryIsoCode'] = data.country.isoCode;
        req['CLient-IP'] = data.traits.ipAddress;
        req['CLient-Network'] = data.traits.network;
        req['user-type'] = data.traits.userType;
        res.setHeader('Client-IP-Address', `${data.traits.ipAddress}`);
        res.setHeader('Client-Network', `${data.traits.network}`);
        res.setHeader('Client-Location', `${data.country.isoCode}`);
        res.setHeader('Client-userType', `${data.traits.userType}`);
        const currency = await this.currencyService.getCurrentCurrency(data.country.isoCode);
        if (currency) {
          req['currency'] = currency;
          return next();
        }
        req['currency'] = {
          currencyCode: countryToCurrency[data.country.isoCode],
          symbol: getSymbolFromCurrency(process.env.BASE_CURRENCY.toUpperCase().trim()), 
          rate: 1,
        };
        return next();
      } catch (err) {
        console.log(err);
        this.Logger.error(err);
        return next(err);
      }
    })();
  }
}
