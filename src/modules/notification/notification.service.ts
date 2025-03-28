import { Injectable } from '@nestjs/common';

import { GreetReqDto } from './types/greet.type';
import { greetLanguageMessage } from './utils/greet-language-message.util';

@Injectable()
export class NotificationService {
  public greet(dto: GreetReqDto) {
    const { language } = dto;

    return { message: greetLanguageMessage[language] };
  }
}
