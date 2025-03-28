import { ApiResponse } from '@nestjs/swagger';
import { applyDecorators, HttpCode, Type } from '@nestjs/common';

import { CustomErrorDto } from '@shared/dto/custom-error.dto';
import { ValidationErrorDto } from '@shared/dto/validation-error.dto';

export function CustomApiResponse<
  T extends Type<unknown> | Function | [Function] | string,
>(SuccessResponseDto: T, successStatus: number = 200) {
  return applyDecorators(
    ApiResponse({
      description: 'Validation error',
      status: 400,
      type: ValidationErrorDto,
    }),
    ApiResponse({
      description: 'Throwing exception error',
      status: '4XX',
      type: CustomErrorDto,
    }),
    ApiResponse({
      status: successStatus,
      type: SuccessResponseDto,
    }),
  );
}
