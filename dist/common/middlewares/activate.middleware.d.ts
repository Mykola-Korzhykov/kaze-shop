import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Admin } from '../../admin/models/admin.model';
import { Owner } from '../../owner/models/owner.model';
export declare class ActivateMiddleware implements NestMiddleware {
    private adminRepository;
    private ownerRepository;
    constructor(adminRepository: typeof Admin, ownerRepository: typeof Owner);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
