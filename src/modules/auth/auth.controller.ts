import { Post, Body, Controller, Get, HttpCode } from '@nestjs/common';

import { Public } from '@shared/decorators/public.decorator';
import { CustomApiResponse } from '@shared/decorators/success-response.decorator';

import { AuthService } from './auth.service';
import { LoginReqDto, LoginResDto } from './dto/login.dto';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @CustomApiResponse(LoginResDto)
  @Post('login')
  public login(@Body() dto: LoginReqDto) {
    return this.authService.login(dto);
  }
}
