import { Controller, Get, Headers } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';

import { Language } from './types/greet.type';
import { NotificationService } from './notification.service';
import { AcceptLanguage } from './decorators/accept-language.decorator';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @ApiBearerAuth('access_token')
  @AcceptLanguage(['en', 'uk'])
  @Get('greet')
  public greet(@Headers('Accept-Language') language: Language) {
    return this.notificationService.greet({ language });
  }
}
