import {
  HttpStatus,
  Injectable,
  NestMiddleware,
  Req,
  Scope,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Next, Res } from '@nestjs/common/decorators';
import { AdminService } from '../../admin/services/admin.service';
import { OwnerService } from '../../owner/services/owner.service';
import { UsersService } from '../../users/services/users.service';
import {
  EMAIL_NOT_PROVIDED,
  USER_WITH_EMAIL_NOT_FOUND,
} from '../../auth/auth.constants';
import { ApiException } from '../exceptions/api.exception';
@Injectable({ scope: Scope.REQUEST })
export class InitializeEmailMiddleware implements NestMiddleware {
  constructor(
    private readonly ownerService: OwnerService,
    private readonly adminService: AdminService,
    private readonly userService: UsersService,
  ) {}
  async use(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    const email = req?.body?.email;
    try {
      if (!email) {
        throw new ApiException(
          HttpStatus.BAD_REQUEST,
          'Bad request',
          EMAIL_NOT_PROVIDED,
        );
      }
      const owner = await this.ownerService.getOwnerByEmail(email);
      if (owner) {
        req['codeDto'] = { email: owner.email, type: 'OWNER' };
        return next();
      }
      const admin = await this.adminService.getAdminByEmail(email);
      if (admin) {
        req['codeDto'] = { email: admin.email, type: 'ADMIN' };
        return next();
      }
      const user = await this.userService.getUserByEmail(email);
      if (!user) {
        throw new ApiException(
          HttpStatus.NOT_FOUND,
          'Not found!',
          USER_WITH_EMAIL_NOT_FOUND,
        );
      }
      res.setHeader('X-Content-Type-Options', 'nosniff');
      req['codeDto'] = { email: user.email, type: null };
      return next();
    } catch (err: unknown) {
      return next(err);
    }
  }
}
