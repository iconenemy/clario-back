import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';

import { CoreModule } from '@core/core.module';
import { AccessJWTGuard } from '@shared/guards/access-jwt.guard';

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

  /* DTO Validator */
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const result = errors.map((error) => ({
          property: error.property,
          message: error.constraints[Object.keys(error.constraints)[0]],
        }));
        return new BadRequestException(result);
      },
      whitelist: true,
      stopAtFirstError: true,
    }),
  );

  /* Protect All Endpoints */
  app.useGlobalGuards(app.get(AccessJWTGuard));

  /* Swagger */
  const config = new DocumentBuilder()
    .setTitle('API docs')
    .addBearerAuth(
      {
        description: `Please enter token in following format: JWT`,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'access_token',
    )
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
