import { ApiHeader } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

import { Language } from '../types/greet.type';

export function AcceptLanguage(languages: Array<Language>) {
  return applyDecorators(
    ApiHeader({
      name: 'Accept-Language',
      description: 'Language preference (en or uk)',
      required: true,
      schema: {
        type: 'string',
        enum: languages,
      },
    }),
  );
}
