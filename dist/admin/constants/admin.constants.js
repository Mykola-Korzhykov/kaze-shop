"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PHONENUMBER_VALIDATION = exports.INVALID_PHONE_NUMBER = exports.INVALID_LINK = exports.ADMIN_NOT_FOUND = exports.INVALID_EMAIL_OR_PASSWORD = exports.ADMIN_WITH_EMAIL_NOT_FOUND = exports.ADMIN_WITH_EMAIL_DOESNT_EXIST = exports.ADMIN_WITH_PHONENUMBER_EXIST = exports.ADMIN_WITH_EMAIL_EXIST = exports.INVALID_EMAIL = exports.RESET_TIME_EXPIRED = exports.INVALID_CODE = exports.ADMIN_OR_ROLE_NOT_FOUND = exports.ADMIN_ID_NOT_PROVIDED = exports.NOT_ACTIVATED = exports.ACCESS_DENIED = exports.ADMINNAME_VALIDATION = exports.EMAIL_VALIDATION = exports.PHONE_NUMRER_VALIDATION = exports.PASSWORD_VALIDATION = void 0;
exports.PASSWORD_VALIDATION = 'Password must be between 6 and 64 characters long with 1 special character and capital character each';
exports.PHONE_NUMRER_VALIDATION = 'Phone number must be 13 characters long. Invalid phone number. Please try again.';
exports.EMAIL_VALIDATION = 'Email must be valid. Invalid email address. Please try again.';
exports.ADMINNAME_VALIDATION = 'ADMIN name must be valid. Invalid ADMINname. Please try again.';
exports.ACCESS_DENIED = {
    en: 'Access denied!',
    ua: 'Доступ заборонено!',
    ru: 'Доступ запрещен!',
    rs: 'Приступ забрањен!'
};
exports.NOT_ACTIVATED = {
    en: 'Access denied, because you are not activated!',
    ua: 'Доступ заборонено, тому що ви не активовані!',
    ru: 'Доступ запрещен, так как вы не активированы!',
    rs: 'Приступ одбијен, јер нисте активирани!'
};
exports.ADMIN_ID_NOT_PROVIDED = {
    en: 'User-id token not provided!',
    ua: 'Токен ідентифікатора користувача не надано!',
    ru: 'Токен идентификатора пользователя не предоставлен!',
    rs: 'Токен корисничког ИД-а није обезбеђен!'
};
exports.ADMIN_OR_ROLE_NOT_FOUND = {
    en: 'ADMIN or Role not found!',
    ua: 'Користувач або роль не знайдено!',
    ru: 'Пользователь или роль не найдены!',
    rs: 'Корисник или улога нису пронађени!'
};
exports.INVALID_CODE = {
    en: 'Invalid confirm code!',
    ua: 'Недійсний код підтвердження!',
    ru: 'Неверный код подтверждения!',
    rs: 'Неважећи код за потврду!'
};
exports.RESET_TIME_EXPIRED = {
    en: 'Reset time expired!',
    ua: 'Час скидання минув!',
    ru: 'Время сброса истекло!',
    rs: 'Време ресетовања је истекло!'
};
exports.INVALID_EMAIL = {
    en: 'Invalid email!',
    ua: 'Недійсна електронна адреса!',
    ru: 'Неверный адрес электронной почты!',
    rs: 'Корисник није пронађен!'
};
exports.ADMIN_WITH_EMAIL_EXIST = {
    en: 'ADMIN with this email already exist, pick different one.',
    ua: 'Користувач з такою поштою вже існує, оберіть іншу',
    ru: 'Пользователь с такой почтой уже существует, выберите другую',
    rs: 'Корисник са овом е-поштом већ постоји, изаберите другог'
};
exports.ADMIN_WITH_PHONENUMBER_EXIST = {
    en: 'ADMIN with this phone number already exist, pick different one.',
    ua: 'Користувач із таким номером телефону вже існує, виберіть інший.',
    ru: 'Пользователь с таким номером телефона уже существует, выберите другой.',
    rs: 'Корисник са овим бројем телефона већ постоји, изаберите други.'
};
exports.ADMIN_WITH_EMAIL_DOESNT_EXIST = {
    en: 'ADMIN with this email doesn`t exist, pick different one.',
    ua: 'Користувача з цією електронною адресою не існує, виберіть іншу.',
    ru: 'Пользователь с таким адресом электронной почты не существует, выберите другого.',
    rs: 'Корисник са овом е-поштом не постоји, изаберите други.'
};
exports.ADMIN_WITH_EMAIL_NOT_FOUND = {
    en: 'ADMIN with this email not found!',
    ua: 'Користувача з цією електронною адресою не знайдено!',
    ru: 'Пользователь с таким адресом электронной почты не найден!',
    rs: 'Корисник са овом е-поштом није пронађен!'
};
exports.INVALID_EMAIL_OR_PASSWORD = {
    en: 'Invalid entered email or password',
    ua: 'Неправильна введена адреса електронної пошти або пароль',
    ru: 'Неверно введенный адрес электронной почты или пароль',
    rs: 'Неважећа унета адреса е-поште или лозинка'
};
exports.ADMIN_NOT_FOUND = {
    en: 'ADMIN not found!',
    ua: 'Користувач не знайдений!',
    ru: 'Пользователь не найден!',
    rs: 'Корисник није пронађен!'
};
exports.INVALID_LINK = {
    en: 'Invalid activation link! ADMIN doesn`t exist.',
    ua: 'Користувач не знайдений!',
    ru: 'Пользователь не найден!',
    rs: 'Корисник није пронађен!'
};
exports.INVALID_PHONE_NUMBER = {
    en: 'Phone number is not valid!',
    ua: 'Користувач не знайдений!',
    ru: 'Пользователь не найден!',
    rs: 'Корисник није пронађен!'
};
exports.PHONENUMBER_VALIDATION = 'Provided phoneNumber is incorrect!';
//# sourceMappingURL=admin.constants.js.map