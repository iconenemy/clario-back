import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AccessJwtStrategy } from './strategies/access-jwt.strategy';

@Module({
  imports: [JwtModule, PassportModule.register({ session: false })],
  controllers: [AuthController],
  providers: [AuthService, AccessJwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
