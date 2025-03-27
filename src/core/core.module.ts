import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CoreController } from '@core/core.controller';
import { PrismaModule } from '@core/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    PrismaModule,
  ],
  controllers: [CoreController],
})
export class CoreModule {}
