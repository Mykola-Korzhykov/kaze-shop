import { JwtRefreshTokenDeletedEvent } from '../events/jwt-refresh-token-deleted.evet';
export declare class AppListener {
    handleTokenDeletedEvent(event: JwtRefreshTokenDeletedEvent): JwtRefreshTokenDeletedEvent;
}
