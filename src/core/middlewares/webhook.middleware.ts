import { HttpService } from '@nestjs/axios';
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
import crypto from 'crypto';
import { catchError, firstValueFrom, map } from 'rxjs';
@Injectable({ scope: Scope.REQUEST })
export class WebhookMiddleware implements NestMiddleware {
  private readonly Logger = new Logger(WebhookMiddleware.name);
  constructor(private readonly httpService: HttpService) {}
  use(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    (async () => {
      try {
        const userAgent = req.get('User-Agent');
        const hash = crypto
          .createHash('sha256')
          .update(userAgent.toString().toLowerCase())
          .digest('base64');
        res.setHeader(
          'Public-Key-Pins',
          `pin-sha256="${hash}"; max-age=5184000`,
        );
        const message = await firstValueFrom(
          this.httpService
            .post(
              `${process.env.WEBHOOK_URL.trim()}${process.env.CONTAINER.trim()}`,
              {
                headers: {
                  'Accept-Encoding': 'gzip,deflate,compress',
                },
              },
            )
            .pipe(map((res) => res.data))
            .pipe(
              catchError((error) => {
                this.Logger.error(error.response.data);
                throw error;
              }),
            ),
        );
        this.Logger.log(`Container reloaded with message: ${message}}`);
        return next();
      } catch (err) {
        this.Logger.error(err);
        return next(err);
      }
    })();
  }
}
