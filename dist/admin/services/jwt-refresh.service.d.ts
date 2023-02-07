import { JwtService } from '@nestjs/jwt';
import { AdminRefreshToken } from '../models/admin.refresh.token.model';
import { AdminService } from './admin.service';
import { CreateAdminRefreshTokenDto } from '../dto/create-admin-refresh-token.dto';
import { MailService } from '../../mail/mail.service';
import { TasksService } from '../../core/services/scedule.service';
export declare class AdminJwtRefreshService {
    private jwtService;
    private adminService;
    private sheduleService;
    private mailService;
    private readonly adminRefreshTokenRepository;
    constructor(jwtService: JwtService, adminService: AdminService, sheduleService: TasksService, mailService: MailService, adminRefreshTokenRepository: typeof AdminRefreshToken);
    generateRefreshToken(payload: CreateAdminRefreshTokenDto): Promise<string>;
    validateRefreshToken(adminRefreshToken: string): Promise<CreateAdminRefreshTokenDto>;
    saveToken(adminId: number, adminRefreshToken: string, email: string, adminAgent: string, phoneNumber: string, expireDate: Date): Promise<AdminRefreshToken>;
    removeToken(adminRefreshToken: string): Promise<number>;
    findToken(adminRefreshToken: string): Promise<AdminRefreshToken | false>;
    findTokenByToken(adminRefreshToken: string): Promise<AdminRefreshToken | false>;
    findTokenByParams(email: string, phoneNumber: string): Promise<AdminRefreshToken>;
    removeTokenInTime(adminRefreshTokenId: number): Promise<number | false>;
}
