import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { OwnerJwtRefreshService } from '../../owner/services/jwt-refresh.service';
import { Reflector } from '@nestjs/core';
import { AdminJwtRefreshService } from '../../admin/services/jwt-refresh.service';
import { AuthService } from '../../auth/auth.service';
export declare class OwnerAdminGuard implements CanActivate {
    private readonly ownerJwtRefreshTokenService;
    private readonly adminJwtRefreshTokenService;
    private reflector;
    private authService;
    constructor(ownerJwtRefreshTokenService: OwnerJwtRefreshService, adminJwtRefreshTokenService: AdminJwtRefreshService, reflector: Reflector, authService: AuthService);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
