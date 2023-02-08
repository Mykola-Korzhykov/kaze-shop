import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  Scope,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { payload } from '../../core/interfaces/auth.interfaces';
import { UserJwtRefreshTokenService } from '../../users/services/jwt-refresh.service';
import { REFRESH_TOKEN_NOT_PROVIDED, USER_NOT_AUTHORIZIED } from '../../auth/auth.constants';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles-auth.decorator';
import { AuthService } from '../../auth/auth.service';
import { ApiException } from '../exceptions/api.exception';
import { CreateUserRefreshTokenDto } from 'src/users/dto/create-user-refresh-token.dto';

@Injectable({ scope: Scope.REQUEST })
export class UserGuard implements CanActivate {
  constructor(
    private readonly userJwtRefreshTokenService: UserJwtRefreshTokenService,
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
        console.log(accessToken, refreshToken);
        if (!refreshToken) {
          throw new ApiException(HttpStatus.BAD_REQUEST, 'Bad request!', REFRESH_TOKEN_NOT_PROVIDED);
        }
        const decodedRefreshToken = Buffer.from(refreshToken, 'base64').toString(
          'ascii',
        );
        if (process.env.NODE_ENV === 'production') {
          const decodedAccessToken = Buffer.from(accessToken, 'base64').toString('ascii');
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
        const userRefreshToken = await this.userJwtRefreshTokenService.findToken(
          decodedRefreshToken,
      );
        if (!userRefreshToken) {
          return false;
        }
        const payload: payload = req?.payload;
        if (!payload) {
          throw new ApiException(HttpStatus.UNAUTHORIZED, 'Unathorized!', USER_NOT_AUTHORIZIED);
        }
        if (payload.userId !== userRefreshToken.userId) {
          throw new ApiException(HttpStatus.UNAUTHORIZED, 'Unathorized!', USER_NOT_AUTHORIZIED);
        }
        const refreshPayload =
          await this.userJwtRefreshTokenService.validateRefreshToken(
            decodedRefreshToken.trim(),
        );
        return refreshPayload.roles.some(
          (role: { value: string; description: string }) =>
            requiredRoles.includes(role.value),
        );
      }
    )();
  }
}
