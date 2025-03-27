import { ApiResponse } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';

import { Public } from '@shared/decorators/public.decorator';

@Public()
@Controller()
export class CoreController {
  @ApiResponse({ status: 200, description: 'Health check' })
  @Get('health')
  healthCheck() {
    return { message: 'Okey' };
  }
}
