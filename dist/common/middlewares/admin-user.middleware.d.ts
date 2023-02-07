import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AdminService } from '../../admin/services/admin.service';
export declare class AdminUserMiddleware implements NestMiddleware {
    private readonly adminService;
    constructor(adminService: AdminService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
