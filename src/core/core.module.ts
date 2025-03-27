import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CoreController } from '@core/core.controller';
import { AuthModule } from '@modules/auth/auth.module';
import { PrismaModule } from '@core/prisma/prisma.module';
import { AccessJWTGuard } from '@shared/guards/access-jwt.guard';
import { NotificationModule } from '@modules/notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    AuthModule,
    PrismaModule,
    NotificationModule,
  ],
  providers: [AccessJWTGuard],
  controllers: [CoreController],
})
export class CoreModule {}
