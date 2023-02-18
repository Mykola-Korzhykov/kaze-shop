import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { OwnerJwtRefreshService } from '../../owner/services/jwt-refresh.service';
import { AdminJwtRefreshService } from '../../admin/services/jwt-refresh.service';
import { UserJwtRefreshTokenService } from '../../users/services/jwt-refresh.service';
export declare class InitializeUserMiddleware implements NestMiddleware {
    private readonly ownerJwtRefreshTokenService;
    private readonly adminJwtRefreshTokenService;
    private readonly userJwtRefreshTokenService;
    constructor(ownerJwtRefreshTokenService: OwnerJwtRefreshService, adminJwtRefreshTokenService: AdminJwtRefreshService, userJwtRefreshTokenService: UserJwtRefreshTokenService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
