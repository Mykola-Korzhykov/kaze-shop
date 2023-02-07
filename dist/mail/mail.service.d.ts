import { MailerService } from '@nestjs-modules/mailer';
export declare class MailService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    sendActivationMail(toMail: string, link: string): Promise<void>;
    sendCode(toMail: string, code: number, locale: 'ua' | 'ru' | 'rs' | 'en'): Promise<void>;
}
