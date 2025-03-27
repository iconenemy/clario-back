import { ApiResponse } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class CoreController {
  @ApiResponse({ status: 200, description: 'Health check' })
  @Get('health')
  healthCheck() {
    return { message: 'Okey' };
  }
}
