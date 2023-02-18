import { JwtService } from '@nestjs/jwt';
import { UserRefreshToken } from '../models/user.refresh.token.model';
import { UsersService } from './users.service';
import { CreateUserRefreshTokenDto } from '../dto/create-user-refresh-token.dto';
import { TasksService } from '../../core/services/scedule.service';
export declare class UserJwtRefreshTokenService {
    private jwtService;
    private userService;
    private sheduleService;
    private readonly userRefreshTokenRepository;
    constructor(jwtService: JwtService, userService: UsersService, sheduleService: TasksService, userRefreshTokenRepository: typeof UserRefreshToken);
    generateRefreshToken(payload: CreateUserRefreshTokenDto): Promise<string>;
    validateRefreshToken(userRefreshToken: string): Promise<CreateUserRefreshTokenDto>;
    insertToken(userId: number, userRefreshToken: string, email: string, userAgent: string, expireDate: Date): Promise<UserRefreshToken>;
    saveToken(userId: number, userRefreshToken: string, email: string, userAgent: string, expireDate: Date, identifier: string): Promise<UserRefreshToken>;
    removeToken(userRefreshToken: string): Promise<number>;
    findTokenByToken(userRefreshToken: string, identifier: string): Promise<UserRefreshToken>;
    findToken(userRefreshToken: string): Promise<{
        token: UserRefreshToken;
        userId: number;
    }>;
    removeTokenInTime(userRefreshTokenId: number, identifier: string): Promise<number | false>;
}
