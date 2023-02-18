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
    private readonly Logger;
    constructor(jwtService: JwtService, adminService: AdminService, sheduleService: TasksService, mailService: MailService, adminRefreshTokenRepository: typeof AdminRefreshToken);
    generateRefreshToken(payload: CreateAdminRefreshTokenDto): Promise<string>;
    validateRefreshToken(adminRefreshToken: string): Promise<CreateAdminRefreshTokenDto>;
    insertToken(adminId: number, adminRefreshToken: string, email: string, adminAgent: string, phoneNumber: string, expireDate: Date): Promise<AdminRefreshToken>;
    saveToken(adminId: number, adminRefreshToken: string, email: string, adminAgent: string, phoneNumber: string, expireDate: Date, identifier: string): Promise<AdminRefreshToken>;
    removeToken(adminRefreshToken: string): Promise<number>;
    findToken(adminRefreshToken: string): Promise<false | {
        token: AdminRefreshToken;
        adminId: number;
    }>;
    findTokenByToken(adminRefreshToken: string, identifier: string): Promise<AdminRefreshToken | false>;
    findTokenByParams(email: string, phoneNumber: string, identifier: string): Promise<AdminRefreshToken>;
    removeTokenInTime(adminRefreshTokenId: number, identifier: string): Promise<number | false>;
    private generateEncryptedValue;
    private generateActivationCode;
}
