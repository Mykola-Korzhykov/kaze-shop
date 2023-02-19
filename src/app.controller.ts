import {
  Controller,
  Get,
  HttpCode,
  Logger,
  Next,
  Req,
  Res,
  Sse,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import path from 'path';
import { Reader } from '@maxmind/geoip2-node';
import { Observable, map, timeout } from 'rxjs';
import { NextFunction, Request, Response } from 'express';
import { randomBytes, scrypt, createCipheriv } from 'crypto';
import { promisify } from 'util';
import countryToCurrency from 'country-to-currency';
import { HttpService } from '@nestjs/axios';
@ApiTags('/')
@Controller('/')
export class AppController {
  private readonly Logger = new Logger(AppController.name);
  constructor(private readonly httpService: HttpService) {
    
  }
  @Get('set')
  @HttpCode(200)
  set(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction
  ) {
    (async () => {
      try {
        if (!request.signedCookies['_id']) {
          const _id = await this.generateEncryptedValue('USER', 16);
          response.cookie('_id', _id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' ? true : false,
            sameSite: 'strict',
            signed: true,
            path: '/',
            maxAge: 30 * 24 * 60 * 60 * 1000,
          });
          return response.json({ _id: _id});
        }
        return response.json({ _id: request.signedCookies['_id']});
      } catch (err: unknown) {
        this.Logger.error(err);
        next(err);
      }
    })();
  }

  @Get('get')
  @HttpCode(200)
  getLocation(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction
  ) {
    (async () => {
      try {
        const ipAddress = request.headers['x-forwarded-for'];
        this.Logger.log(ipAddress);
        const reader = await Reader.open(path.join(__dirname, 'GeoLite2-Country.mmdb'));
        const geoCountry = reader.country(request.ip);
        return response.json({
          currency: countryToCurrency[`${geoCountry.country.isoCode}`],   
          geoLocation: { ...geoCountry },
        });
      } catch (err) {
        this.Logger.error(err);
        next(err);
      }
    })();
  }


  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return timeout(1000).apply(
      map((_) => ({ data: { hello: 'world' } } as MessageEvent)),
    );
  }

  private async generateEncryptedValue(
    value: string,
    bytes: number,
  ): Promise<string> {
    const iv = randomBytes(bytes);
    const API_KEY = process.env.API_KEY.toString();
    const key = (await promisify(scrypt)(API_KEY, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, iv);
    return Buffer.concat([cipher.update(value), cipher.final()]).toString(
      'base64',
    );
  }
}