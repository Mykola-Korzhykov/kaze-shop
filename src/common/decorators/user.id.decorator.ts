import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserId = createParamDecorator(
  (data: 'USER-ID', ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const userId = request?.payload?.userId;
    return data ? userId : request?.payload?.userId;
  },
);
