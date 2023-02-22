import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  Scope,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  INVALID_REQUEST,
  USER_NOT_DETECTED,
  NO_RIGHT,
} from '../../auth/auth.constants';
import { AdminService } from '../../admin/services/admin.service';
import { Payload } from '../../core/interfaces/auth.interfaces';
import { ApiException } from '../exceptions/api.exception';

@Injectable({ scope: Scope.REQUEST })
export class EditContentGuard implements CanActivate {
  constructor(private readonly adminService: AdminService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return (async () => {
      const req = context.switchToHttp().getRequest();
      const payload: Payload = req?.payload;
      const type: 'OWNER' | 'ADMIN' | null = req['type'];
      if (!payload) {
        throw new ApiException(
          HttpStatus.UNAUTHORIZED,
          'Unathorized!',
          INVALID_REQUEST,
        );
      }
      if (type === undefined) {
        throw new ApiException(
          HttpStatus.UNAUTHORIZED,
          'Unathorized!',
          USER_NOT_DETECTED,
        );
      }
      if (type && type === 'OWNER') {
        return true;
      }
      const admin = await this.adminService.getAdminById(payload.userId);
      if (type && type === 'ADMIN' && admin.getEditContent()) {
        return true;
      }
      throw new ApiException(HttpStatus.FORBIDDEN, 'Forbidden!', NO_RIGHT);
    })();
  }
}
