import { CreateRoleDto } from './dto/create.role.dto';
import { Role } from './models/roles.model';
import { RolesService } from './roles.service';
export declare class RolesController {
    private readonly roleService;
    constructor(roleService: RolesService);
    createRole(roleDto: CreateRoleDto): Promise<Role>;
    getRoleByValue(value: string): Promise<Role>;
}
