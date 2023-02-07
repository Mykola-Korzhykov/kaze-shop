import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AdminService } from '../../admin/services/admin.service';
import { OwnerService } from '../../owner/services/owner.service';
import { UsersService } from '../../users/services/users.service';
import { payload } from '../../core/interfaces/auth.interfaces';
import { USER_NOT_FOUND } from 'src/users/constants/user.constants';
import { ApiException } from '../exceptions/api.exception';
import { INVALID_REQUEST, NO_LINK_PROVIDED, USER_NOT_DETECTED } from 'src/auth/auth.constants';

@Injectable({ scope: Scope.REQUEST })
export class AuthFerfershGuard implements CanActivate {
  constructor(
    private readonly ownerService: OwnerService,
    private readonly adminService: AdminService,
    private readonly userService: UsersService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return (async () => {
      const req = context.switchToHttp().getRequest();
      const payload: payload = req?.payload;
      const type: 'OWNER' | 'ADMIN' | null = req['type'];
      if (!payload) {
        throw new ApiException(HttpStatus.UNAUTHORIZED, 'Unathorized!', INVALID_REQUEST);
      }
      if (type === undefined) {
        throw new ApiException(HttpStatus.UNAUTHORIZED, 'Unathorized!', USER_NOT_DETECTED);
      }
      if (type && type === 'OWNER') {
        const activationLink: string = req?.signedCookies['user-id'];
        if (!activationLink) {
          throw new ApiException(HttpStatus.FORBIDDEN, 'Forbidden!', NO_LINK_PROVIDED);
        }
        return this.ownerService.checkOwner(payload, activationLink);
      }
      if (type && type === 'ADMIN') {
        const activationLink: string = req?.signedCookies['user-id'];
        if (!activationLink) {
          throw new ApiException(HttpStatus.FORBIDDEN, 'Forbidden!', NO_LINK_PROVIDED);
        }
        return this.adminService.checkAdmin(payload, activationLink);
      }
      const user = await this.userService.getUserById(payload.userId);
      if (!user) {
        throw new ApiException(HttpStatus.NOT_FOUND, 'Not found!', USER_NOT_FOUND);  
      }
      return true;
    })();
  }
}
