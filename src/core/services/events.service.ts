import { Injectable } from '@nestjs/common';
import { Scope } from '@nestjs/common/interfaces';
import { OnEvent } from '@nestjs/event-emitter';
import { JwtRefreshTokenDeletedEvent } from '../events/jwt-refresh-token-deleted.evet';

@Injectable({ scope: Scope.DEFAULT })
export class AppListener {
  @OnEvent('refreshtoken.deleted')
  handleTokenDeletedEvent(event: JwtRefreshTokenDeletedEvent) {
    return event;
  }
}
