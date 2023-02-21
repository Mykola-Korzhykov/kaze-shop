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
import { Observable, map, timeout, firstValueFrom, catchError } from 'rxjs';
import { NextFunction, Request, Response } from 'express';
import { randomBytes, scrypt, createCipheriv } from 'crypto';
import { promisify } from 'util';
import { HttpService } from '@nestjs/axios';
import { Query, UseGuards } from '@nestjs/common/decorators';
import { ThrottlerBehindProxyGuard } from './common/guards/throttler-behind-proxy.guard';
import { Throttle } from '@nestjs/throttler';
@ApiTags('/')
@UseGuards(ThrottlerBehindProxyGuard)
@Controller('/')
export class AppController {
  private readonly Logger = new Logger(AppController.name);
  constructor(
    private readonly httpService: HttpService,
  ) {}

  @Throttle(20, 500)
  @Get('set-user')
  @HttpCode(200)
  setCookie(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
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

  @Throttle(20, 500)
  @Get('get-location')
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
        const geoCountry = reader.country('62.122.202.29');
        return response.json({   
          geoLocation: {
            currency: request['currency'],
            ...geoCountry
          },
        });
      } catch (err) {
        this.Logger.error(err);
        next(err);
      }
    })();
  }

  @Throttle(20, 500)
  @Get('get-currencies')
  @HttpCode(200)
  getCurrency(
    @Query('base') base: string,
  ) {
    try {
      return this.getCurrencies(base);
    } catch (err) {
      this.Logger.error(err);
      throw err;
    }
  }

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return timeout(1000).apply(
      map((_) => ({ data: { hello: 'world' } } as MessageEvent)),
    );
  }

  private async getCurrencies(base: string | undefined): Promise<any> {
    const data = await firstValueFrom(this.httpService.get(
      `${process.env.API_CURRENCIES.trim()}/${!base ? process.env.BASE_CURRENCY.toLowerCase().trim() : base.toLowerCase().trim()}.json`,
      { headers: { 'Accept-Encoding': 'gzip,deflate,compress' } }
    ).pipe(map(res => res.data)).pipe(catchError((error) => {
        this.Logger.error(error.response.data);
        throw error;
      }))
    );
    return data;
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