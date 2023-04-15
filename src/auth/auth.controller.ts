import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from 'src/user/dtos/register.dto';
import { IsPublic } from './decorators/ispublic.decorator';

@Controller('auth')
export class AuthController {
  // O que significa esse {} no final ?
  // De onde surgiu esse private readonly ?
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @IsPublic()
  // Não ficou muito claro aqui esse decorator e o dto
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @IsPublic()
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }
}
