import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ResetDto } from './dto/reset.password.dto';
import { SignupDto } from './dto/signup.dto';
import { NextFunction, Request, Response } from 'express';
import { CodeDto } from '../core/interfaces/auth.interfaces';
import { ChangeDto } from './dto/change.password.dto';
import { AppListener } from '../core/services/events.service';
export declare class AuthController {
    private authService;
    private appListener;
    constructor(authService: AuthService, appListener: AppListener);
    signup(userDto: SignupDto, response: Response, request: Request, next: NextFunction, userAgent: string): void;
    login(userDto: LoginDto, response: Response, request: Request, next: NextFunction, userAgent: string): void;
    refresh(response: Response, request: Request, next: NextFunction, type: 'OWNER' | 'ADMIN' | null, userAgent: string): void;
    logout(response: Response, request: Request, next: NextFunction, type: 'OWNER' | 'ADMIN' | null): void;
    fetchRenewalCode(codeDto: CodeDto, locale: 'ua' | 'ru' | 'rs' | 'en'): Promise<string>;
    resetPassword(resetDto: ResetDto, codeDto: CodeDto): Promise<string | void>;
    changePassword(response: Response, request: Request, next: NextFunction, changeDto: ChangeDto, userId: number, type: 'OWNER' | 'ADMIN' | null): void;
    activate(activationLink: string, code: number, request: Request, response: Response, next: NextFunction, type: 'OWNER' | 'ADMIN', userAgent: string): void;
}
