import {
  HttpStatus,
  Injectable,
  NestMiddleware,
  Next,
  Req,
  Res,
  Scope,
} from '@nestjs/common';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { Request, Response, NextFunction } from 'express';
import { ADMIN_NOT_FOUND } from 'src/admin/constants/admin.constants';
import { INVALID_PARAMS } from 'src/auth/auth.constants';
import { AdminService } from '../../admin/services/admin.service';
import { ApiException } from '../exceptions/api.exception';

@Injectable({ scope: Scope.REQUEST })
export class AdminUserMiddleware implements NestMiddleware {
  constructor(private readonly adminService: AdminService) {}
  async use(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const name = req?.body?.name;
      const surname = req?.body?.surname;
      const email = req?.body?.email;
      const phoneNumber = req?.body?.phoneNumber;
      const isAdmin = req?.body?.isAdmin;
      const addContent = req?.body?.addContent;
      const editContent = req?.body?.editContent;
      const editWebSite = req?.body?.editWebSite;
      if (
        !name ||
        !surname ||
        !phoneNumber ||
        !email ||
        !isAdmin.toString() ||
        !addContent.toString() ||
        !editContent.toString() ||
        !editWebSite.toString()
      ) {
        throw new ApiException(HttpStatus.BAD_REQUEST, 'Bad request!', INVALID_PARAMS);
      }
      const admin = await this.adminService.getAdminByEmail(email);
      if (admin.phoneNumber === phoneNumber) {
        req.body.password = admin.getPassword();
        req.body.activationLink = admin.activationLink;
        return next();
      }
      throw new ApiException(HttpStatus.NOT_FOUND, 'Not found!', ADMIN_NOT_FOUND);
    } catch (err: unknown) {
      return next(err);
    }
  }
}
