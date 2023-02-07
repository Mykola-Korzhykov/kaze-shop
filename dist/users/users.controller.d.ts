import { User } from './models/user.model';
import { UsersService } from './services/users.service';
import { BanUserDto } from './dto/ban-user.dto';
import { AuthService } from '../auth/auth.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { NextFunction, Request, Response } from 'express';
import { UserInterface } from '../core/interfaces/user.interfaces';
export declare class UsersController {
    private readonly userService;
    private readonly authService;
    constructor(userService: UsersService, authService: AuthService);
    getAllUsers(page: number, pageSize: number): Promise<UserInterface[] | []>;
    findUser(v: string[], page: number, pageSize: number): Promise<any[]>;
    banUser(dto: BanUserDto): Promise<User>;
    update(response: Response, request: Request, next: NextFunction, userId: number, userDto: UpdateUserDto, userAgent: string): void;
}
