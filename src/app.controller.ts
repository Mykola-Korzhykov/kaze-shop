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
import { HttpService } from '@nestjs/axios';
import { Query, UseGuards } from '@nestjs/common/decorators';
import { ThrottlerBehindProxyGuard } from './common/guards/throttler-behind-proxy.guard';
import { Throttle } from '@nestjs/throttler';
@ApiTags('/')
@UseGuards(ThrottlerBehindProxyGuard)
@Controller('/')
export class AppController {
  private readonly Logger = new Logger(AppController.name);
  constructor(private readonly httpService: HttpService) {}
  @Throttle(20, 500)
  @Get('get-location')
  @HttpCode(200)
  getLocation(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ) {
    (async () => {
      try {
        const ipAddress = request.headers['x-forwarded-for'];
        this.Logger.log(ipAddress);
        const reader = await Reader.open(
          path.join(__dirname, process.env.IP_ADDRESS_DB.trim()),
        );
        const geoCountry = reader.country(request.ip);
        return response.json({
          geoLocation: {
            currency: request['currency'],
            city: request['city'],
            ...geoCountry,
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
  getCurrency(@Query('base') base: string) {
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      map((_) => ({ data: { hello: 'world' } } as MessageEvent)),
    );
  }

  private async getCurrencies(base: string | undefined): Promise<any> {
    const data = await firstValueFrom(
      this.httpService
        .get(
          `${process.env.API_CURRENCIES.trim()}/${
            !base
              ? process.env.BASE_CURRENCY.toLowerCase().trim()
              : base.toLowerCase().trim()
          }.json`,
          { headers: { 'Accept-Encoding': 'gzip,deflate,compress' } },
        )
        .pipe(map((res) => res.data))
        .pipe(
          catchError((error) => {
            this.Logger.error(error.response.data);
            throw error;
          }),
        ),
    );
    return data;
  }
}
