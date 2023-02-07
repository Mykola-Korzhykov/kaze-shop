import { LoginDto } from '../../auth/dto/login.dto';
import { CreateOwnerDto } from '../dto/create.owner.dto';
import { Owner } from '../models/owner.model';
import { RolesService } from '../../roles/roles.service';
import { ResetDto } from '../../auth/dto/reset.password.dto';
import { CodeDto } from '../../core/interfaces/auth.interfaces';
import { payload } from '../../core/interfaces/auth.interfaces';
export declare class OwnerService {
    private readonly ownerRepository;
    private readonly roleService;
    constructor(ownerRepository: typeof Owner, roleService: RolesService);
    static creatingOwner(OWNER: string[]): Promise<Owner>;
    createOwner(dto: CreateOwnerDto): Promise<Owner>;
    private create;
    findByActivationLink(activationLink: string): Promise<Owner>;
    getOwnerById(id: number): Promise<Owner>;
    getOwnerByEmail(email: string): Promise<Owner>;
    getOwnerByPhoneNumber(phoneNumber: string): Promise<Owner>;
    validateOwner(ownerDto: LoginDto): Promise<Owner | boolean>;
    checkOwner(payload: payload, activationLink: string | undefined): Promise<boolean>;
    setConfirmCode(codeDto: CodeDto, code: number): Promise<string>;
    resetPassword(resetDto: ResetDto): Promise<string>;
    changePassword(ownerId: number, password: string): Promise<Owner | void>;
    private rewritePassword;
}
