"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailModule = void 0;
const common_1 = require("@nestjs/common");
const mail_service_1 = require("./mail.service");
const mailer_1 = require("@nestjs-modules/mailer");
const admin_module_1 = require("../admin/admin.module");
const auth_module_1 = require("../auth/auth.module");
const owner_module_1 = require("../owner/owner.module");
const roles_module_1 = require("../roles/roles.module");
const users_module_1 = require("../users/users.module");
const config_1 = require("@nestjs/config");
let MailModule = class MailModule {
};
MailModule = __decorate([
    (0, common_1.Module)({
        providers: [mail_service_1.MailService],
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: `.${process.env.NODE_ENV}.env`,
                expandVariables: true,
                isGlobal: true,
            }),
            (0, common_1.forwardRef)(() => admin_module_1.AdminModule),
            (0, common_1.forwardRef)(() => roles_module_1.RolesModule),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => owner_module_1.OwnerModule),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: ((_a = process.env.MAILER_HOST) === null || _a === void 0 ? void 0 : _a.toString().trim()) || 'smtp.gmail.com',
                    port: Number((_b = process.env.MAILER_PORT) === null || _b === void 0 ? void 0 : _b.trim()) || 465,
                    secure: Boolean((_c = process.env.MAILER_SECURITY) === null || _c === void 0 ? void 0 : _c.trim()) || true,
                    auth: {
                        user: ((_d = process.env.MAILER_USER) === null || _d === void 0 ? void 0 : _d.toString().trim()) ||
                            'kazesport2022@gmail.com',
                        pass: ((_e = process.env.MAILER_PASS) === null || _e === void 0 ? void 0 : _e.toString().trim()) || 'flbwyzikawirfudk',
                    },
                    tls: {
                        rejectUnauthorized: false,
                    },
                },
                defaults: {
                    from: '"No Reply" <noreply@example.com>',
                },
            }),
        ],
        exports: [mail_service_1.MailService],
    })
], MailModule);
exports.MailModule = MailModule;
//# sourceMappingURL=mail.module.js.map