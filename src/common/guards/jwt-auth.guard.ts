import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ADMIN_NOT_AUTHORIZIED, USER_NOT_AUTHORIZIED } from '../../auth/auth.constants';
import { AuthService } from '../../auth/auth.service';
import { payload } from '../../core/interfaces/auth.interfaces';
import { ApiException } from '../exceptions/api.exception';
@Injectable({ scope: Scope.REQUEST })
export class JwtAuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return (async () => {
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization.toString().trim();
      if (!authHeader) {
        throw new ApiException(HttpStatus.UNAUTHORIZED, 'Unathorized!', USER_NOT_AUTHORIZIED);
      }
      const bearer = authHeader.split(' ')[0];
      const accessToken = authHeader.split(' ')[1];
      if (bearer !== 'Bearer' || !accessToken) {
        throw new ApiException(HttpStatus.UNAUTHORIZED, 'Unathorized!', USER_NOT_AUTHORIZIED);
      }
      const decodedToken = Buffer.from(accessToken, 'base64').toString('ascii');
      let payload: payload;
      try {
        payload = await this.authService.validateAccessToken(decodedToken);
      } catch (err) {
        throw new ApiException(HttpStatus.UNAUTHORIZED, 'Unathorized!', USER_NOT_AUTHORIZIED);
      }
      if (!payload) {
        throw new ApiException(HttpStatus.UNAUTHORIZED, 'Unathorized!', USER_NOT_AUTHORIZIED);
      }
      req.payload = payload;
      return true;
    })();
  }
}
