import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { JWTPayload } from '@shared/types/jwt-payload.type';

export const Account = createParamDecorator(
  (data: keyof JWTPayload, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const account = request.account;

    return data ? account?.[data] : (account as JWTPayload);
  },
);
