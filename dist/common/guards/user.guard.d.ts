import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserJwtRefreshTokenService } from '../../users/services/jwt-refresh.service';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../../auth/auth.service';
export declare class UserGuard implements CanActivate {
    private readonly userJwtRefreshTokenService;
    private reflector;
    private authService;
    constructor(userJwtRefreshTokenService: UserJwtRefreshTokenService, reflector: Reflector, authService: AuthService);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
