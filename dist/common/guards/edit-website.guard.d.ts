import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AdminService } from '../../admin/services/admin.service';
export declare class EditWebsiteGuard implements CanActivate {
    private readonly adminService;
    constructor(adminService: AdminService);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
