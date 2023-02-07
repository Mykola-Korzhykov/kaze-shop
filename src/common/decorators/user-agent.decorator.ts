import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserAgent = createParamDecorator(
  (data: 'USER-AGENT', ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const userAgent = request['userAgent'];
    return data ? userAgent : request['userAgent'];
  },
);
