import { JwtService } from '@nestjs/jwt';
import { TasksService } from '../../core/services/scedule.service';
import { MailService } from '../../mail/mail.service';
import { CreateOwnerRefreshTokenDto } from '../dto/create.owner.refresh.token.dto';
import { OwnerRefreshToken } from '../models/owner.refresh.token.model';
import { OwnerService } from './owner.service';
export declare class OwnerJwtRefreshService {
    private readonly jwtService;
    private readonly ownerService;
    private readonly mailService;
    private sheduleService;
    private readonly ownerRefreshTokenRepository;
    constructor(jwtService: JwtService, ownerService: OwnerService, mailService: MailService, sheduleService: TasksService, ownerRefreshTokenRepository: typeof OwnerRefreshToken);
    generateRefreshToken(payload: CreateOwnerRefreshTokenDto): Promise<string>;
    validateRefreshToken(ownerRefreshToken: string): Promise<CreateOwnerRefreshTokenDto | void>;
    saveToken(ownerId: number, ownerRefreshToken: string, email: string, ownerAgent: string, phoneNumber: string, expireDate: Date): Promise<OwnerRefreshToken>;
    removeToken(ownerRefreshToken: string): Promise<number>;
    findTokenByToken(ownerRefreshToken: string): Promise<OwnerRefreshToken>;
    findToken(ownerRefreshToken: string): Promise<OwnerRefreshToken | boolean>;
    findTokenByParams(email: string, phoneNumber: string): Promise<OwnerRefreshToken>;
    removeTokenInTime(ownerRefreshTokenId: number): Promise<number | false>;
}
