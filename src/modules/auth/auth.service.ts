import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ConflictException, Injectable, Logger } from '@nestjs/common';

import { PrismaService } from '@core/prisma/prisma.service';
import { JWTPayload } from '@shared/types/jwt-payload.type';

import { LoginReqDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {}

  public async login(dto: LoginReqDto) {
    this.logger.log('Login');

    const { email, password } = dto;

    const accountOrder = await this.prismaService.account.findUnique({
      where: { email },
    });

    if (!accountOrder)
      throw new ConflictException('Incorrect data. Try again.');

    const isMatchPassword = await this.comparePassword(
      accountOrder.password,
      password,
    );

    if (!isMatchPassword)
      throw new ConflictException('Incorrect data. Try again.');

    const access_token = await this.issueToken({
      id: accountOrder.id,
    });

    return { access_token };
  }

  public async verifyAccessJWT(accessToken: string) {
    return this.jwtService
      .verifyAsync(accessToken, {
        secret: this.configService.getOrThrow<string>('ACCESS_JWT_SECRET'),
      })
      .catch((error: Error) => {
        this.logger.error(`VerifyAccess - ${error.message}`);
      });
  }

  private async issueToken(payload: JWTPayload): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow<string>('ACCESS_JWT_SECRET'),
      expiresIn: this.configService.getOrThrow<string>('ACCESS_JWT_EXPIRE'),
    });
  }

  private async hashPassword(password: string): Promise<string> {
    return argon2.hash(password);
  }

  private async comparePassword(
    hash: string,
    password: string,
  ): Promise<boolean> {
    return argon2.verify(hash, password);
  }
}
