import { MailerService } from '@nestjs-modules/mailer';
import { UsersService } from '../users/services/users.service';
import { AdminService } from '../admin/services/admin.service';
import { OwnerService } from '../owner/services/owner.service';
export declare class MailService {
    private readonly mailerService;
    private readonly userService;
    private readonly adminService;
    private readonly ownerService;
    private readonly Logger;
    constructor(mailerService: MailerService, userService: UsersService, adminService: AdminService, ownerService: OwnerService);
    sendActivationMailToOwner(toMail: string, link: string): Promise<void>;
    sendActivationMailToAdmin(toMail: string, link: string): Promise<void>;
    sendCode(toMail: string, code: number, locale: 'ua' | 'ru' | 'rs' | 'en'): Promise<void>;
}
