import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AdminJwtRefreshService } from '../../admin/services/jwt-refresh.service';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../../auth/auth.service';
export declare class AdminGuard implements CanActivate {
    private readonly adminJwtRefreshTokenService;
    private reflector;
    private authService;
    constructor(adminJwtRefreshTokenService: AdminJwtRefreshService, reflector: Reflector, authService: AuthService);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
