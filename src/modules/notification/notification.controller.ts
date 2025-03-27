import { ApiBearerAuth } from '@nestjs/swagger';
import { Controller, Get, Headers } from '@nestjs/common';

import { Language } from './types/greet.type';
import { NotificationService } from './notification.service';
import { SuccessResDto } from '@shared/dto/success-response.dto';
import { AcceptLanguage } from './decorators/accept-language.decorator';
import { CustomApiResponse } from '@shared/decorators/success-response.decorator';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @ApiBearerAuth('access_token')
  @AcceptLanguage(['en', 'uk'])
  @CustomApiResponse(SuccessResDto)
  @Get('greet')
  public greet(@Headers('Accept-Language') language: Language) {
    return this.notificationService.greet({ language });
  }
}
