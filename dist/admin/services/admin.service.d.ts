import { CreateAdminDto } from '../dto/create-admin.dto';
import { Admin } from '../models/admin.model';
import { LoginDto } from '../../auth/dto/login.dto';
import { ResetDto } from '../../auth/dto/reset.password.dto';
import { CodeDto } from '../../core/interfaces/auth.interfaces';
import { Payload } from '../../core/interfaces/auth.interfaces';
import { AdminInterface } from '../../core/interfaces/admin.interfaces';
import { UsersService } from '../../users/services/users.service';
import { User } from '../../users/models/user.model';
import { RolesService } from '../../roles/roles.service';
export declare class AdminService {
    private adminRepository;
    private readonly userService;
    private readonly roleService;
    constructor(adminRepository: typeof Admin, userService: UsersService, roleService: RolesService);
    findAdmin(v: string[], page: number, adminPerPage: number): Promise<any[]>;
    createAdmin(dto: CreateAdminDto): Promise<Admin | User>;
    updateAdmin(dto: CreateAdminDto): Promise<number | Admin>;
    findByActivationLink(activationLink: string): Promise<Admin>;
    getAllAdmins(page: number, adminPerPage: number): Promise<AdminInterface[] | []>;
    getAdminById(id: number): Promise<Admin>;
    getAdminByEmail(email: string): Promise<Admin>;
    checkAdmin(payload: Payload, activationLink: string | undefined): Promise<boolean>;
    getAdminByPhoneNumber(phoneNumber: string): Promise<Admin>;
    validateAdmin(adminDto: LoginDto): Promise<Admin | boolean>;
    setConfirmCode(codeDto: CodeDto, code: number): Promise<string>;
    resetPassword(resetDto: ResetDto): Promise<string>;
    changePassword(adminId: number, password: string): Promise<Admin>;
    private rewritePassword;
}