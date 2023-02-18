import { INestApplication, Logger } from '@nestjs/common';
type CallbackFunction = () => Promise<INestApplication>;
export declare class AppClusterService {
    static readonly Logger: Logger;
    static clusterize(callback: CallbackFunction): Promise<void>;
    private static trackOfhttpRequests;
    private static setTimeouts;
}
export {};
