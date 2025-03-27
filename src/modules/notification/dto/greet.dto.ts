import { IsString } from 'class-validator';

export class GreetResDto {
  @IsString()
  message: string;
}
