import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'tdshgre4h6k7{=}weg34lhbthbtgn';

export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
