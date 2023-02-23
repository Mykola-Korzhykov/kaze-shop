"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(4);
const swagger_1 = __webpack_require__(5);
const app_module_1 = __webpack_require__(6);
const helmet_1 = __importDefault(__webpack_require__(178));
const compression_1 = __importDefault(__webpack_require__(179));
const cookie_parser_1 = __importDefault(__webpack_require__(180));
const serve_favicon_1 = __importDefault(__webpack_require__(181));
const cluster_service_1 = __webpack_require__(110);
const common_1 = __webpack_require__(7);
const all_exceptions_filter_1 = __webpack_require__(107);
const error_handler_filter_1 = __webpack_require__(85);
const api_exception_filter_1 = __webpack_require__(87);
const path_1 = __webpack_require__(115);
const body_parser_1 = __importDefault(__webpack_require__(182));
const PORT = Number(process.env.PORT) || 2222;
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule, {
            bodyParser: true,
            bufferLogs: true,
            autoFlushLogs: true,
            forceCloseConnections: true,
        });
        const httpAdapter = app.get(core_1.HttpAdapterHost);
        app.enableShutdownHooks();
        app.useGlobalPipes(new common_1.ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        }));
        app.useGlobalFilters(new all_exceptions_filter_1.AllExceptionsFilter(httpAdapter), new error_handler_filter_1.ApiErrorExceptionFilter(), new api_exception_filter_1.ApiExceptionFilter());
        app.set('trust proxy', true);
        app.use((0, serve_favicon_1.default)((0, path_1.join)(__dirname, 'static', 'favicon', 'favicon.ico')));
        app.useStaticAssets((0, path_1.join)(__dirname, 'static'), {
            prefix: '/public',
            lastModified: true,
            immutable: true,
            etag: true,
            redirect: true,
            fallthrough: true,
            maxAge: 30 * 24 * 60,
            setHeaders(res, path, stat) {
                res.setHeader('Access-Control-Allow-Origin', `${process.env.CLIENT_URL.toString().trim()}`);
                res.setHeader('Content-size', `${stat.size}`);
                res.setHeader('Content-Type', `image/${(0, path_1.extname)(path).replace('.', '')}`);
                res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
                res.setHeader('Access-Control-Allow-Credentials', 'true');
                res.setHeader('Access-Control-Allow-Headers', 'imageType, Authorization, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
                res.setHeader('Content-Security-Policy', `default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'`);
            },
        });
        app.use(body_parser_1.default.urlencoded({ extended: false }));
        app.use(body_parser_1.default.json());
        app.use((0, helmet_1.default)());
        app.use(helmet_1.default.xssFilter());
        app.use(helmet_1.default.hsts({
            maxAge: 2629746000,
        }));
        app.use(helmet_1.default.crossOriginResourcePolicy({ policy: 'cross-origin' }));
        app.use(helmet_1.default.referrerPolicy({ policy: 'same-origin' }));
        app.use((0, cookie_parser_1.default)(process.env.SECRET_KEY.toString().trim()));
        app.enableCors({
            origin: `${process.env.CLIENT_URL.toString().trim()}`,
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
            preflightContinue: true,
            optionsSuccessStatus: 204,
            credentials: true,
            allowedHeaders: ['Content-Type', 'Authorization', 'imageType'],
            exposedHeaders: ['Content-Range', 'X-Content-Range'],
        });
        app.use((0, compression_1.default)({
            level: 1,
            threshold: 1,
            windowBits: 15,
            memLevel: 9,
            chunkSize: 16384,
        }));
        const config = new swagger_1.DocumentBuilder()
            .addSecurity('basic', {
            type: 'http',
            scheme: 'basic',
        })
            .addApiKey({
            type: 'http',
        })
            .addBearerAuth({
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            name: 'JWT',
            description: 'Enter JWT token',
            in: 'header',
        }, 'JWT-auth')
            .setTitle('Kazi.spos-API')
            .setDescription('Kazi.spos-API Docs')
            .setVersion('1.1.2')
            .addTag('nest.js')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('/api/docs', app, document);
        process.on('unhandledRejection', (reason) => {
            console.log(reason.name, reason.message);
            console.log(reason);
            console.log('UNHANDLED REJECTION! 💥 Shutting down...');
            return process.exit(1), reason;
        });
        process.on('uncaughtException', (err) => {
            console.log(err.name, err.message);
            console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
            return process.exit(1);
        });
        try {
            yield app.listen(PORT, () => __awaiter(this, void 0, void 0, function* () {
                console.log(`Directory: ${process.cwd()}, Process: ${process.pid}, URL: ${yield app.getUrl()}, Server is being listened on port: ${PORT}`);
                return app.getUrl();
            }));
            if (true) {
                module.hot.accept();
                module.hot.dispose(() => app.close());
            }
            return app;
        }
        catch (error) {
            console.error(`Error occured: ${error.message}`);
        }
    });
}
if (((_a = process.env) === null || _a === void 0 ? void 0 : _a.NODE_ENV) === 'development') {
    try {
        startServer();
    }
    catch (err) {
        console.log(err);
    }
}
if (((_b = process.env) === null || _b === void 0 ? void 0 : _b.NODE_ENV) === 'production') {
    try {
        cluster_service_1.AppClusterService.clusterize(startServer);
    }
    catch (err) {
        console.log(err);
    }
}


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("26136b20ce76a62d5036")
/******/ })();
/******/ 
/******/ }
;