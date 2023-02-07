import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { payload } from '../../core/interfaces/auth.interfaces';
import {
  ACCESS_DENIED,
  ADMIN_NOT_AUTHORIZIED,
  OWNER_NOT_AUTHORIZIED,
  REFRESH_TOKEN_NOT_PROVIDED,
  USER_NOT_AUTHORIZIED,
  USER_NOT_DETECTED
} from '../../auth/auth.constants';
import { OwnerJwtRefreshService } from '../../owner/services/jwt-refresh.service';
import { OwnerRefreshToken } from '../../owner/models/owner.refresh.token.model';
import { ROLES_KEY } from '../decorators/roles-auth.decorator';
import { Reflector } from '@nestjs/core';
import { AdminJwtRefreshService } from '../../admin/services/jwt-refresh.service';
import { AdminRefreshToken } from '../../admin/models/admin.refresh.token.model';
import { AuthService } from '../../auth/auth.service';
import { ApiException } from '../exceptions/api.exception';

@Injectable({ scope: Scope.REQUEST })
export class OwnerAdminGuard implements CanActivate {
  constructor(
    private readonly ownerJwtRefreshTokenService: OwnerJwtRefreshService,
    private readonly adminJwtRefreshTokenService: AdminJwtRefreshService,
    private reflector: Reflector,
    private authService: AuthService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return (async () => {
      const requiredRoles: string[] = this.reflector.getAllAndOverride(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (!requiredRoles) {
        return true;
      }
      const req = context.switchToHttp().getRequest();
      const accessToken = req?.cookies['accessToken'];
      const refreshToken = req?.cookies['refreshToken'];
      if (!refreshToken) {
        throw new ApiException(HttpStatus.BAD_REQUEST, 'Bad request!', REFRESH_TOKEN_NOT_PROVIDED);
      }
      const decodedToken = Buffer.from(refreshToken, 'base64').toString(
        'ascii',
      );
      const decodedAccessToken = Buffer.from(accessToken, 'base64').toString(
        'ascii',
      );
      if (process.env.NODE_ENV === 'production') {
        const accessPayload = await this.authService.validateAccessToken(
          decodedAccessToken,
        );
        if (
          !accessPayload.roles.some(
            (role: { value: string; description: string }) =>
              requiredRoles.includes(role.value),
          )
        ) {
          throw new ApiException(HttpStatus.UNAUTHORIZED, 'Unathorized!', USER_NOT_AUTHORIZIED);
        }
      }
      const type: 'OWNER' | 'ADMIN' | null = req['type'];
      if (type === undefined) {
        throw new ApiException(HttpStatus.UNAUTHORIZED, 'Unathorized!', USER_NOT_DETECTED);
      }
      if (type && type === 'OWNER') {
        const userRefreshToken =
          await this.ownerJwtRefreshTokenService.findToken(decodedToken);
        if (!userRefreshToken) {
          throw new ApiException(HttpStatus.UNAUTHORIZED, 'Unathorized!', OWNER_NOT_AUTHORIZIED);
        }
        const payload: payload = req?.payload;
        if (!payload) {
          throw new ApiException(HttpStatus.UNAUTHORIZED, 'Unathorized!', OWNER_NOT_AUTHORIZIED);
        }
        if (
          userRefreshToken instanceof OwnerRefreshToken &&
          payload.userId !== userRefreshToken.ownerId
        ) {
          throw new ApiException(HttpStatus.UNAUTHORIZED, 'Unathorized!', OWNER_NOT_AUTHORIZIED);
        }
        const refreshPayload =
          await this.ownerJwtRefreshTokenService.validateRefreshToken(
            decodedToken,
          );
        if (!refreshPayload) {
          return false;
        }
        return refreshPayload.roles.some(
          (role: { value: string; description: string }) =>
            requiredRoles.includes(role.value),
        );
      }
      if (type && type === 'ADMIN') {
        const userRefreshToken =
          await this.adminJwtRefreshTokenService.findToken(decodedToken);
        if (!userRefreshToken) {
          throw new ApiException(HttpStatus.UNAUTHORIZED, 'Unathorized!', ADMIN_NOT_AUTHORIZIED);
        }
        const payload: payload = req?.payload;
        if (!payload) {
          throw new ApiException(HttpStatus.UNAUTHORIZED, 'Unathorized!', ADMIN_NOT_AUTHORIZIED);
        }
        if (
          userRefreshToken instanceof AdminRefreshToken &&
          payload.userId !== userRefreshToken.adminId
        ) {
          throw new ApiException(HttpStatus.UNAUTHORIZED, 'Unathorized!', ADMIN_NOT_AUTHORIZIED);
        }
        const refreshPayload =
          await this.adminJwtRefreshTokenService.validateRefreshToken(
            decodedToken,
          );
        return refreshPayload.roles.some(
          (role: { value: string; description: string }) =>
            requiredRoles.includes(role.value),
        );
      }
      throw new HttpException(ACCESS_DENIED, HttpStatus.FORBIDDEN);
    })();
  }
}
