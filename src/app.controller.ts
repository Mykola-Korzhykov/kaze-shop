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
import IP from 'ip';
@ApiTags('/')
@Controller('/')
export class AppController {
  private readonly Logger = new Logger(AppController.name);
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
        const ipAddress = IP.address();
        const reader = await Reader.open(path.join(__dirname, 'GeoLite2-Country.mmdb'));
        const res = reader.country(ipAddress);
        return response.json(res.country.isoCode);
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
