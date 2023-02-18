import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Scope,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { ROLES_KEY } from '../decorators/roles-auth.decorator';
import { Payload } from '../../core/interfaces/auth.interfaces';
import { USER_NOT_AUTHORIZIED } from '../../auth/auth.constants';
import { ApiException } from '../exceptions/api.exception';
import { ACCESS_DENIED } from '../../admin/constants/admin.constants';
@Injectable({ scope: Scope.REQUEST })
export class RolesGuard implements CanActivate {
  constructor(private authService: AuthService, private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return (async () => {
      try {
        const requiredRoles: string[] = this.reflector.getAllAndOverride(
          ROLES_KEY,
          [context.getHandler(), context.getClass()],
        );
        if (!requiredRoles) {
          return true;
        }
        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers.authorization;
        const bearer = authHeader.split(' ')[0];
        const token = authHeader.split(' ')[1];
        if (bearer !== 'Bearer' || !token) {
          throw new ApiException(HttpStatus.UNAUTHORIZED, 'Unathorized!', USER_NOT_AUTHORIZIED);
        }
        const decodedToken = Buffer.from(token, 'base64').toString('ascii');
        let payload: Payload;
        try {
          payload = await this.authService.validateAccessToken(decodedToken);
        } catch (err) {
          throw new ApiException(HttpStatus.UNAUTHORIZED, 'Unathorized!', USER_NOT_AUTHORIZIED);
        }
        if (!payload) {
          throw new ApiException(HttpStatus.UNAUTHORIZED, 'Unathorized!', USER_NOT_AUTHORIZIED);
        }
        req.payload = payload;
        if (
          !payload.roles.some(
          (role: { value: string; description: string }) =>
            requiredRoles.includes(role.value))
        ) {
          throw new ApiException(HttpStatus.UNAUTHORIZED, 'Unathorized!', ACCESS_DENIED);
        }
        return true;
      } catch (err) {
        throw new ApiException(HttpStatus.UNAUTHORIZED, 'Unathorized!', ACCESS_DENIED);
      }
    })();
  }
}
