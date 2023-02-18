import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AdminService } from '../../admin/services/admin.service';
import { OwnerService } from '../../owner/services/owner.service';
import { UsersService } from '../../users/services/users.service';
export declare class InitializeEmailMiddleware implements NestMiddleware {
    private readonly ownerService;
    private readonly adminService;
    private readonly userService;
    constructor(ownerService: OwnerService, adminService: AdminService, userService: UsersService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
