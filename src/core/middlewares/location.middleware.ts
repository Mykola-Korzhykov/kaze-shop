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
import path from 'path';
import { Reader } from '@maxmind/geoip2-node';
import { CurrencyService } from '../../owner/services/currency.service';
import getSymbolFromCurrency from 'currency-symbol-map';
import countryToCurrency from 'country-to-currency';
@Injectable({ scope: Scope.REQUEST })
export class LocationMiddleware implements NestMiddleware {
  private readonly Logger = new Logger(LocationMiddleware.name);
  constructor(private readonly currencyService: CurrencyService) {}
  use(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    (async () => {
      try {
        const reader = await Reader.open(
          path.join(__dirname, process.env.IP_ADDRESS_DB.trim()),
        );
        const data = reader.country(req.ip);
        const geo = geoip.lookup(req.ip);
        this.Logger.log(geo);
        req['countryIsoCode'] = data.country.isoCode;
        req['CLient-IP'] = data.traits.ipAddress;
        req['CLient-Network'] = data.traits.network;
        req['user-type'] = data.traits.userType;
        req['city'] = geo.city;
        req['geo'] = geo;
        res.setHeader('Client-IP-Address', `${data.traits.ipAddress}`);
        res.setHeader('Client-Network', `${data.traits.network}`);
        res.setHeader('Client-Location', `${data.country.isoCode}`);
        const currency = await this.currencyService.getCurrentCurrency(
          data.country.isoCode,
        );
        if (currency) {
          req['currency'] = {
            countryCode: data.country.isoCode,
            currrencyCode: currency.currrencyCode,
            symbol: currency.symbol,
            rate: Number(currency.rate),
          };
          return next();
        }
        req['currency'] = {
          countryCode: data.country.isoCode,
          currencyCode: countryToCurrency[data.country.isoCode],
          symbol: getSymbolFromCurrency(
            process.env.BASE_CURRENCY.toUpperCase().trim(),
          ),
          rate: Number(1),
        };
        return next();
      } catch (err) {
        this.Logger.error(err);
        return next(err);
      }
    })();
  }
}
