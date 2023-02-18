import { CreateAdminDto } from './dto/create-admin.dto';
import { Admin } from './models/admin.model';
import { AdminService } from './services/admin.service';
import { AdminInterface } from '../core/interfaces/admin.interfaces';
import { User } from '../users/models/user.model';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    createAdmin(adminDto: CreateAdminDto): Promise<Admin | User>;
    updateAdmin(adminDto: CreateAdminDto): Promise<number | Admin>;
    findAdmin(v: string[], page: number, pageSize: number): Promise<any[]>;
    getAllUsers(page: number, pageSize: number): Promise<AdminInterface[] | []>;
}
