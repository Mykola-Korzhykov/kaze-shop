import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NestMiddleware,
  Next,
  Req,
  Res,
  Scope,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Request, Response, NextFunction } from 'express';
import { ACTIVTING_PARAMS_NOT_PROVIDED, INVALID_PARAMS } from '../../auth/auth.constants';
import { Admin } from '../../admin/models/admin.model';
import { Owner } from '../../owner/models/owner.model';
import { ApiException } from '../exceptions/api.exception';

@Injectable({ scope: Scope.REQUEST })
export class ActivateMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(Admin) private adminRepository: typeof Admin,
    @InjectModel(Owner) private ownerRepository: typeof Owner,
  ) {}
  async use(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const activationLink: string = req.params?.link;
      const code = Number(req.query?.code);
      if (!activationLink || !code) {
        throw new ApiException(HttpStatus.BAD_REQUEST, 'Bad request!', ACTIVTING_PARAMS_NOT_PROVIDED);
      }
      res.setHeader('X-Content-Type-Options', 'nosniff');
      const owner = await this.ownerRepository.findOne({
        where: {
          resetToken: activationLink,
        },
      });
      if (
        owner &&
        !owner.getIsActivated() &&
        Number(Date.now()) < owner.getResetTokenExpiration() &&
        code === owner.getActivationCode()
      ) {
        req['activationLink'] = owner.activationLink;
        req['type'] = 'OWNER';
        return next();
      }
      const admin = await this.adminRepository.findOne({
        where: {
          resetToken: activationLink,
        },
      });
      if (
        admin &&
        !admin.getIsActivated() &&
        Number(Date.now()) < admin.getResetTokenExpiration() &&
        code === admin.getActivationCode()
      ) {
        req['type'] = 'ADMIN';
        req['activationLink'] = admin.activationLink;
        return next();
      }
      throw new ApiException(HttpStatus.BAD_REQUEST, 'Bad request!', INVALID_PARAMS);
    } catch (err: unknown) {
      return next(err);
    }
  }
}
