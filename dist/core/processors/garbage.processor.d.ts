import { Job } from 'bull';
export declare class GarbageCollectingProcessor {
    private readonly logger;
    handleTranscode(job: Job): void;
}
