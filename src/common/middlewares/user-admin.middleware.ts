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
import { INVALID_PARAMS } from '../../auth/auth.constants';
import { USER_NOT_FOUND } from '../../users/constants/user.constants';
import { v4 } from 'uuid';
import { UsersService } from '../../users/services/users.service';
import { ApiException } from '../exceptions/api.exception';

@Injectable({ scope: Scope.REQUEST })
export class UserAdminMiddleware implements NestMiddleware {
  constructor(private readonly userService: UsersService) {}
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
      const user = await this.userService.getUserByEmail(email);
      if (user.phoneNumber === phoneNumber) {
        req.body.password = user.getPassword();
        req.body.activationLink = v4();
        return next();
      }
      throw new ApiException(HttpStatus.NOT_FOUND, 'Not found!', USER_NOT_FOUND);  
    } catch (err: unknown) {
      return next(err);
    }
  }
}
