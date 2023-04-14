import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from 'src/user/dtos/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // O que significa esse {} no final ?
  // De onde surgiu esse private readonly ?

  @Post('login')
  @HttpCode(HttpStatus.OK)
  // Não ficou muito claro aqui esse decorator e o dto
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }
}
