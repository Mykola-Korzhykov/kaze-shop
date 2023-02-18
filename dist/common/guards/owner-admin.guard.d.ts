import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { OwnerJwtRefreshService } from '../../owner/services/jwt-refresh.service';
import { Reflector } from '@nestjs/core';
import { AdminJwtRefreshService } from '../../admin/services/jwt-refresh.service';
export declare class OwnerAdminGuard implements CanActivate {
    private readonly ownerJwtRefreshTokenService;
    private readonly adminJwtRefreshTokenService;
    private reflector;
    constructor(ownerJwtRefreshTokenService: OwnerJwtRefreshService, adminJwtRefreshTokenService: AdminJwtRefreshService, reflector: Reflector);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
