import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { CoreModule } from '@core/core.module';

const logger = new Logger('CoreModule');

async function bootstrap() {
  const appOtions = {
    cors: {
      origin: true,
      credentials: true,
    },
  };
  const app = await NestFactory.create(CoreModule, appOtions);

  app.setGlobalPrefix('api');

  /* Swagger */
  const config = new DocumentBuilder()
    .setTitle('API docs')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    autoTagControllers: true,
  });
  SwaggerModule.setup('swagger', app, document, {
    jsonDocumentUrl: 'swagger/json',
    yamlDocumentUrl: 'swagger/yaml',
  });

  /* Start Server */
  const configService = app.get(ConfigService);
  const PORT = configService.getOrThrow<number>('PORT');
  await app.listen(PORT, () =>
    logger.log(`Server is listening on port ${PORT}...`),
  );
}

bootstrap();
