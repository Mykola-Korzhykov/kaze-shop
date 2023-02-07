import { RolesService } from '../../roles/roles.service';
import { AddRoleDto } from '../dto/add-role.dto';
import { BanUserDto } from '../dto/ban-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../models/user.model';
import { InitializeUser, UserInterface, ValidateUser } from '../../core/interfaces/user.interfaces';
import { ResetDto } from '../../auth/dto/reset.password.dto';
import { CodeDto } from '../../core/interfaces/auth.interfaces';
import { UpdateUserDto } from '../dto/update-user.dto';
export declare class UsersService {
    private userRepository;
    private readonly roleService;
    constructor(userRepository: typeof User, roleService: RolesService);
    findUser(v: string[], page: number, userPerPage: number): Promise<any[]>;
    initializeUser(userDto: InitializeUser): Promise<User>;
    updateUser(userDto: UpdateUserDto, userId: number): Promise<User>;
    createUser(dto: CreateUserDto): Promise<User>;
    getAllUsers(page: number, userPerPage: number): Promise<UserInterface[] | []>;
    getUserById(id: number): Promise<User>;
    getUserByEmail(email: string): Promise<User>;
    getUserByPhoneNumber(phoneNumber: string): Promise<User>;
    addRole(dto: AddRoleDto): Promise<AddRoleDto>;
    banUser(dto: BanUserDto): Promise<User>;
    validateUser(userDto: ValidateUser): Promise<User>;
    setConfirmCode(codeDto: CodeDto, code: number): Promise<string>;
    resetPassword(resetDto: ResetDto): Promise<string>;
    changePassword(userId: number, password: string): Promise<void | User>;
    rewritePassword(userId: number, password: string): Promise<User | void>;
}
