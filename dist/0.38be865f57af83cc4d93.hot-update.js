"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 145:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoriesColoursModule = void 0;
const common_1 = __webpack_require__(7);
const categories_service_1 = __webpack_require__(131);
const categories_controller_1 = __webpack_require__(146);
const config_1 = __webpack_require__(105);
const sequelize_1 = __webpack_require__(8);
const admin_module_1 = __webpack_require__(9);
const admin_model_1 = __webpack_require__(28);
const admin_refresh_token_model_1 = __webpack_require__(49);
const auth_module_1 = __webpack_require__(88);
const owner_model_1 = __webpack_require__(31);
const owner_refresh_token_model_1 = __webpack_require__(47);
const owner_module_1 = __webpack_require__(100);
const product_model_1 = __webpack_require__(32);
const roles_model_1 = __webpack_require__(26);
const user_roles_model_1 = __webpack_require__(30);
const roles_module_1 = __webpack_require__(101);
const user_model_1 = __webpack_require__(35);
const user_refresh_token_model_1 = __webpack_require__(36);
const users_module_1 = __webpack_require__(120);
const category_model_1 = __webpack_require__(41);
const product_categories_model_1 = __webpack_require__(42);
const product_module_1 = __webpack_require__(128);
const initialize_user_middleware_1 = __webpack_require__(126);
const colours_service_1 = __webpack_require__(134);
const colours_controller_1 = __webpack_require__(148);
const colours_model_1 = __webpack_require__(45);
const product_colour_model_1 = __webpack_require__(46);
let CategoriesColoursModule = class CategoriesColoursModule {
    configure(consumer) {
        consumer
            .apply(initialize_user_middleware_1.InitializeUserMiddleware)
            .forRoutes({ path: 'categories/create_category', method: common_1.RequestMethod.PUT }, { path: 'categories/delete_category', method: common_1.RequestMethod.DELETE }, { path: 'colours/create_colour', method: common_1.RequestMethod.PUT }, { path: 'colours/delete_colour', method: common_1.RequestMethod.DELETE }, { path: '*', method: common_1.RequestMethod.PATCH });
    }
};
CategoriesColoursModule = __decorate([
    (0, common_1.Module)({
        providers: [categories_service_1.CategoriesService, colours_service_1.ColoursService],
        controllers: [categories_controller_1.CategoriesController, colours_controller_1.ColoursController],
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: `.${process.env.NODE_ENV}.env`,
                expandVariables: true,
                isGlobal: true,
            }),
            sequelize_1.SequelizeModule.forFeature([
                product_model_1.Product,
                category_model_1.Category,
                product_categories_model_1.ProductCategories,
                admin_model_1.Admin,
                admin_refresh_token_model_1.AdminRefreshToken,
                owner_model_1.Owner,
                owner_refresh_token_model_1.OwnerRefreshToken,
                user_model_1.User,
                user_refresh_token_model_1.UserRefreshToken,
                roles_model_1.Role,
                user_roles_model_1.UserRoles,
                colours_model_1.Colour,
                product_colour_model_1.ProductColours,
            ]),
            (0, common_1.forwardRef)(() => product_module_1.ProductModule),
            (0, common_1.forwardRef)(() => admin_module_1.AdminModule),
            (0, common_1.forwardRef)(() => roles_module_1.RolesModule),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => owner_module_1.OwnerModule),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
        ],
        exports: [categories_service_1.CategoriesService, colours_service_1.ColoursService],
    })
], CategoriesColoursModule);
exports.CategoriesColoursModule = CategoriesColoursModule;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("96b23786a8a036effe24")
/******/ })();
/******/ 
/******/ }
;