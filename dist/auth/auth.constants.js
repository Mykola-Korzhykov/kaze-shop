"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NO_RIGHT = exports.INVALID_REQUEST = exports.NO_LINK_PROVIDED = exports.USER_NOT_DETECTED = exports.INVALID_HEADER = exports.ACCESS_TOKEN_NOT_PROVIDED = exports.ACTIVTING_PARAMS_NOT_PROVIDED = exports.USER_WITH_EMAIL_NOT_FOUND = exports.EMAIL_NOT_PROVIDED = exports.REFRESH_TOKEN_NOT_PROVIDED = exports.INVALID_REFRESH_TOKEN = exports.INVALID_PARAMS = exports.OWNER_NOT_AUTHORIZIED = exports.ADMIN_NOT_AUTHORIZIED = exports.USER_NOT_AUTHORIZIED = exports.LANGUAGE_NOT_PROVIDED = exports.ACTIVATION_EXPIRED = exports.NO_TOKEN_PROVIDED = exports.ACCESS_DENIED = exports.INVALID_EMAIL_OR_PASSWORD = exports.USER_WITH_EMAIL_DOESNT_EXIST = exports.USER_WITH_PHONENUMBER_EXIST = exports.USER_WITH_EMAIL_EXIST = exports.SURNAME_VALIDATION = exports.USERNAME_VALIDATION = exports.EMAIL_VALIDATION = exports.PHONE_NUMRER_VALIDATION = exports.PASSWORD_VALIDATION = void 0;
exports.PASSWORD_VALIDATION = 'Password must be between 8 and 64 characters long with 1 special character and capital character each';
exports.PHONE_NUMRER_VALIDATION = 'Phone number must be 13 characters long. Invalid phone number. Please try again.';
exports.EMAIL_VALIDATION = 'Email must be valid. Invalid email address. Please try again.';
exports.USERNAME_VALIDATION = 'User name must be valid. Invalid username. Please try again.';
exports.SURNAME_VALIDATION = 'User surname must be valid. Invalid username. Please try again.';
exports.USER_WITH_EMAIL_EXIST = 'User with this email already exist, pick different one.';
exports.USER_WITH_PHONENUMBER_EXIST = 'User with this phone number already exist, pick different one.';
exports.USER_WITH_EMAIL_DOESNT_EXIST = 'User with this email doesn`t exist, pick different one.';
exports.INVALID_EMAIL_OR_PASSWORD = 'Invalid entered email or password';
exports.ACCESS_DENIED = 'You cannot access this!';
exports.NO_TOKEN_PROVIDED = 'No access token provided!';
exports.ACTIVATION_EXPIRED = {
    en: 'Activation expired!',
    ru: 'Срок действия активации истек!',
    rs: 'Активација је истекла!',
    ua: 'Термін активації минув!'
};
exports.LANGUAGE_NOT_PROVIDED = {
    en: 'No language provided!',
    ua: 'Немає мови!',
    ru: 'Язык не указан!',
    rs: 'Није наведен језик!'
};
exports.USER_NOT_AUTHORIZIED = {
    en: 'User is not authorized, token is not valid!',
    ua: 'Користувач не авторизований, токен недійсний!',
    ru: 'Пользователь не авторизован, токен недействителен!',
    rs: 'Корисник није овлашћен, токен није важећи!',
};
exports.ADMIN_NOT_AUTHORIZIED = {
    en: 'Admin is not authorized, token is not valid!',
    ua: 'Адміністратор не авторизований, токен недійсний!',
    ru: 'Админ не авторизован, токен недействителен!',
    rs: 'Администратор није овлашћен, токен није важећи!',
};
exports.OWNER_NOT_AUTHORIZIED = {
    en: 'Owner is not authorized, token is not valid!',
    ua: 'Власник не авторизований, токен недійсний!',
    ru: 'Владелец не авторизован, токен недействителен!',
    rs: 'Власник није овлашћен, токен није важећи!',
};
exports.INVALID_PARAMS = {
    en: 'Invalid request params!',
    ru: 'Недопустимые параметры запроса!',
    ua: 'Недійсні параметри запиту!',
    rs: 'Неважећи параметри захтева!',
};
exports.INVALID_REFRESH_TOKEN = {
    en: 'Invalid refresh token provided!',
    ru: 'Предоставлен неверный токен обновления!',
    ua: 'Надано недійсний токен оновлення!',
    rs: 'Достављен је неважећи токен за освежавање!',
};
exports.REFRESH_TOKEN_NOT_PROVIDED = {
    en: 'Refresh token not provided!',
    ru: 'Токен обновления не предоставлен!',
    ua: 'Токен оновлення не надано!',
    rs: 'Токен за освежавање није обезбеђен!',
};
exports.EMAIL_NOT_PROVIDED = {
    en: 'No email provided!',
    ru: 'Электронная почта не указана!',
    ua: 'Електронна адреса не вказана!',
    rs: 'Није наведена е-пошта!',
};
exports.USER_WITH_EMAIL_NOT_FOUND = {
    en: 'User with this email not found!',
    ru: 'Пользователь с таким адресом электронной почты не найден!',
    ua: 'Користувача з цією електронною адресою не знайдено!',
    rs: 'Корисник са овом е-поштом није пронађен!',
};
exports.ACTIVTING_PARAMS_NOT_PROVIDED = {
    en: 'Activating params not provided!',
    ua: 'Параметри активації не надано!',
    ru: 'Параметры активации не указаны!',
    rs: 'Параметри за активирање нису обезбеђени!'
};
exports.ACCESS_TOKEN_NOT_PROVIDED = {
    en: 'Access token not provided!',
    ru: 'Токен доступа не предоставлен!',
    ua: 'Токен доступу не надано!',
    rs: 'Приступни токен није обезбеђен!',
};
exports.INVALID_HEADER = {
    en: 'Invalid authorization header provided!',
    ru: 'Токен доступа не предоставлен!',
    ua: 'Надано недійсний заголовок авторизації!',
    rs: 'Приступни токен није обезбеђен!',
};
exports.USER_NOT_DETECTED = {
    en: 'User is not detected!',
    ru: 'Пользователь не обнаружен!',
    ua: 'Користувача не виявлено!',
    rs: 'Корисник није откривен!',
};
exports.NO_LINK_PROVIDED = {
    en: 'Access denied! No link provided!',
    ru: 'Доступ запрещен! Ссылка не предоставлена!',
    ua: 'Доступ заборонено! Посилання не надано!',
    rs: 'Приступ забрањен! Није наведена веза!',
};
exports.INVALID_REQUEST = {
    en: 'User is not authorized, invalid request!',
    ru: 'Пользователь не авторизован, неверный запрос!',
    ua: 'Користувач не авторизований, недійсний запит!',
    rs: 'Корисник није овлашћен, неважећи захтев!',
};
exports.NO_RIGHT = {
    en: 'Access denied! You don`t have right to access this!',
    ru: 'Доступ запрещен! У вас нет прав доступа к этому!',
    ua: 'Доступ заборонено! Ви не маєте права доступу до цього!',
    rs: 'Приступ забрањен! Немате право да приступите овоме!',
};
//# sourceMappingURL=auth.constants.js.map