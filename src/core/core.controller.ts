import { Controller, Get } from '@nestjs/common';

import { Public } from '@shared/decorators/public.decorator';
import { SuccessResDto } from '@shared/dto/success-response.dto';
import { CustomApiResponse } from '@shared/decorators/success-response.decorator';

@Public()
@Controller()
export class CoreController {
  @CustomApiResponse(SuccessResDto)
  @Get('health')
  healthCheck() {
    return { message: 'Okey' };
  }
}
