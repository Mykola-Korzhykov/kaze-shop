"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var AppClusterService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppClusterService = void 0;
const cluster_1 = __importDefault(require("cluster"));
const os_1 = require("os");
const common_1 = require("@nestjs/common");
const numCPUs = (0, os_1.cpus)().length;
let AppClusterService = AppClusterService_1 = class AppClusterService {
    static clusterize(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            if (cluster_1.default.isPrimary) {
                AppClusterService_1.Logger.log(`Number of CPUs is ${numCPUs}`);
                AppClusterService_1.Logger.log(`Master server started on ${process.pid}`);
                for (let i = 0; i < numCPUs; i++) {
                    const worker = cluster_1.default.fork();
                }
                cluster_1.default.on('exit', (worker, code, signal) => {
                    AppClusterService_1.Logger.log(`Worker ${worker.process.pid} died. Restarting`, signal || code);
                    cluster_1.default.fork();
                });
            }
            else {
                AppClusterService_1.Logger.log(`Cluster server started on ${process.pid}`);
                const app = yield callback();
                process.on('SIGINT', () => app.close());
                process.on('SIGTERM', () => app.close());
                process.on('SIGUSR2', () => __awaiter(this, void 0, void 0, function* () { return app.close(); }));
                process.on('message', (msg) => {
                    if (msg === 'shutdown') {
                        app.close();
                    }
                });
            }
        });
    }
    static trackOfhttpRequests() {
        let numReqs = 0;
        for (const id in cluster_1.default.workers) {
            cluster_1.default.workers[id].on('message', messageHandler);
        }
        setInterval(() => {
            AppClusterService_1.Logger.log(`numReqs = ${numReqs}`);
        }, 1000);
        function messageHandler(msg) {
            if (msg.cmd && msg.cmd === 'notifyRequest') {
                numReqs = numReqs + 1;
            }
        }
    }
    static setTimeouts(worker) {
        let timeout;
        worker.on('listening', (address) => {
            worker.send('shutdown');
            worker.disconnect();
            timeout = setTimeout(() => {
                worker.kill();
            }, 2000);
        });
        worker.on('disconnect', () => {
            clearTimeout(timeout);
        });
    }
};
AppClusterService.Logger = new common_1.Logger(AppClusterService_1.name);
AppClusterService = AppClusterService_1 = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.DEFAULT })
], AppClusterService);
exports.AppClusterService = AppClusterService;
//# sourceMappingURL=cluster.service.js.map