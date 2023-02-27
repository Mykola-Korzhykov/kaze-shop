import {
  Injectable,
  Scope,
  CanActivate,
  ExecutionContext,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ACCESS_DENIED } from '../../admin/constants/admin.constants';
import { USER_NOT_AUTHORIZIED } from '../../auth/auth.constants';
import { AuthService } from '../../auth/auth.service';
import { Payload } from '../../core/interfaces/auth.interfaces';
import { ROLES_KEY } from '../decorators/roles-auth.decorator';
import { ApiException } from '../exceptions/api.exception';

@Injectable({ scope: Scope.REQUEST })
export class CartGuard implements CanActivate {
  constructor(private authService: AuthService, private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return (async () => {
      try {
        const req = context.switchToHttp().getRequest();
        if (!req['user']) {
          return true;
        }
        const requiredRoles: string[] = this.reflector.getAllAndOverride(
          ROLES_KEY,
          [context.getHandler(), context.getClass()],
        );
        if (!requiredRoles) {
          return true;
        }
        const authHeader = req.headers.authorization;
        const bearer = authHeader.split(' ')[0];
        const token = authHeader.split(' ')[1];
        if (bearer !== 'Bearer' || !token) {
          throw new ApiException(
            HttpStatus.UNAUTHORIZED,
            'Unathorized!',
            USER_NOT_AUTHORIZIED,
          );
        }
        const decodedToken = Buffer.from(token, 'base64').toString('ascii');
        let payload: Payload;
        try {
          payload = await this.authService.validateAccessToken(decodedToken);
        } catch (err) {
          throw new ApiException(
            HttpStatus.UNAUTHORIZED,
            'Unathorized!',
            USER_NOT_AUTHORIZIED,
          );
        }
        if (!payload) {
          throw new ApiException(
            HttpStatus.UNAUTHORIZED,
            'Unathorized!',
            USER_NOT_AUTHORIZIED,
          );
        }
        req.payload = payload;
        if (
          !payload.roles.some((role: { value: string; description: string }) =>
            requiredRoles.includes(role.value),
          )
        ) {
          throw new ApiException(
            HttpStatus.UNAUTHORIZED,
            'Unathorized!',
            ACCESS_DENIED,
          );
        }
        return true;
      } catch (err) {
        throw new ApiException(
          HttpStatus.UNAUTHORIZED,
          'Unathorized!',
          ACCESS_DENIED,
        );
      }
    })();
  }
}
