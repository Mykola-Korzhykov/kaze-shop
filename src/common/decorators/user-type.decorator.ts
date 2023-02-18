import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Type = createParamDecorator(
  (data: 'REFRESHTOKEN' | 'CODEDTO' | 'ACTIVATE', ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (data === 'REFRESHTOKEN') {
      const type: string | null = request['type'];
      return data ? type : request['type'];
    }
    if (data === 'CODEDTO') {
      const email = request['codeDto'];
      return data ? email : request['codeDto'];
    }
    if (data === 'ACTIVATE') {
      const type: string = request['type'];
      return data ? type : request['type'];
    }
  },
);
