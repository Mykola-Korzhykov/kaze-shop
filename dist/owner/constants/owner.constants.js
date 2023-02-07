"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INVALID_PHONE_NUMBER = exports.INVALID_LINK = exports.OWNER_NOT_FOUND = exports.INVALID_EMAIL_OR_PASSWORD = exports.OWNER_WITH_EMAIL_NOT_FOUND = exports.OWNER_WITH_EMAIL_DOESNT_EXIST = exports.OWNER_WITH_PHONENUMBER_EXIST = exports.OWNER_WITH_EMAIL_EXIST = exports.INVALID_EMAIL = exports.RESET_TIME_EXPIRED = exports.INVALID_CODE = exports.OWNER_OR_ROLE_NOT_FOUND = exports.OWNER_ID_NOT_PROVIDED = exports.NOT_ACTIVATED = exports.ACCESS_DENIED = exports.OWNERNAME_VALIDATION = exports.PHONE_NUMRER_VALIDATION = exports.PASSWORD_VALIDATION = exports.PHONENUMBER_VALIDATION = exports.EMAIL_VALIDATION = void 0;
exports.EMAIL_VALIDATION = 'Email must be valid. Invalid email address. Please try again.';
exports.PHONENUMBER_VALIDATION = 'Phone number must be valid. Invalid Phone number. Please try again.';
exports.PASSWORD_VALIDATION = 'Password must be between 6 and 64 characters long with 1 special character and capital character each';
exports.PHONE_NUMRER_VALIDATION = 'Phone number must be 13 characters long. Invalid phone number. Please try again.';
exports.OWNERNAME_VALIDATION = 'OWNER name must be valid. Invalid OWNERname. Please try again.';
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
exports.OWNER_ID_NOT_PROVIDED = {
    en: 'User-id token not provided!',
    ua: 'Токен ідентифікатора користувача не надано!',
    ru: 'Токен идентификатора пользователя не предоставлен!',
    rs: 'Токен корисничког ИД-а није обезбеђен!'
};
exports.OWNER_OR_ROLE_NOT_FOUND = {
    en: 'OWNER or Role not found!',
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
exports.OWNER_WITH_EMAIL_EXIST = {
    en: 'OWNER with this email already exist, pick different one.',
    ua: 'Користувач з такою поштою вже існує, оберіть іншу',
    ru: 'Пользователь с такой почтой уже существует, выберите другую',
    rs: 'Корисник са овом е-поштом већ постоји, изаберите другог'
};
exports.OWNER_WITH_PHONENUMBER_EXIST = {
    en: 'OWNER with this phone number already exist, pick different one.',
    ua: 'Користувач із таким номером телефону вже існує, виберіть інший.',
    ru: 'Пользователь с таким номером телефона уже существует, выберите другой.',
    rs: 'Корисник са овим бројем телефона већ постоји, изаберите други.'
};
exports.OWNER_WITH_EMAIL_DOESNT_EXIST = {
    en: 'OWNER with this email doesn`t exist, pick different one.',
    ua: 'Користувача з цією електронною адресою не існує, виберіть іншу.',
    ru: 'Пользователь с таким адресом электронной почты не существует, выберите другого.',
    rs: 'Корисник са овом е-поштом не постоји, изаберите други.'
};
exports.OWNER_WITH_EMAIL_NOT_FOUND = {
    en: 'OWNER with this email not found!',
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
exports.OWNER_NOT_FOUND = {
    en: 'OWNER not found!',
    ua: 'Користувач не знайдений!',
    ru: 'Пользователь не найден!',
    rs: 'Корисник није пронађен!'
};
exports.INVALID_LINK = {
    en: 'Invalid activation link! OWNER doesn`t exist.',
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
//# sourceMappingURL=owner.constants.js.map