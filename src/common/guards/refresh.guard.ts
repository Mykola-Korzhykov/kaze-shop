import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ACCESS_TOKEN_NOT_PROVIDED, INVALID_HEADER, NO_TOKEN_PROVIDED } from '../../auth/auth.constants';
import { AuthService } from '../../auth/auth.service';
import { ApiException } from '../exceptions/api.exception';

@Injectable()
export class RefreshAuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new ApiException(HttpStatus.BAD_REQUEST, 'Bad request!', INVALID_HEADER);
    }
    const bearer = authHeader.split(' ')[0];
    const accessToken = authHeader.split(' ')[1];
    if (bearer !== 'Bearer' || !accessToken) {
      throw new ApiException(HttpStatus.UNAUTHORIZED, 'Unathorized!', ACCESS_TOKEN_NOT_PROVIDED);
    }
    return true;
  }
}
