import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AdminService } from '../../admin/services/admin.service';
import { OwnerService } from '../../owner/services/owner.service';
import { UsersService } from '../../users/services/users.service';
export declare class AuthFerfershGuard implements CanActivate {
    private readonly ownerService;
    private readonly adminService;
    private readonly userService;
    constructor(ownerService: OwnerService, adminService: AdminService, userService: UsersService);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
