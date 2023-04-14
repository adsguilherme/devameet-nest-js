import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { MessagesHelper } from './helpers/messages.helper';
import { RegisterDto } from 'src/user/dtos/register.dto';
import { UserService } from 'src/user/user.service';
import { UserMessagesHelper } from 'src/user/helpers/messages.helper';
import { JwtService } from '@nestjs/jwt';

@Injectable() // Isso é um decorator e o Nest irá fazer a gestão das instâncias dos objetos
export class AuthService {
  private looger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    this.looger.debug('Login - Started');

    // eslint-disable-next-line prettier/prettier
    const user = await this.userService.getUserByLoginPassword(dto.login, dto.password)
    if (user == null) {
      throw new BadRequestException(
        MessagesHelper.AUTH_PASSWORD_OR_LOGIN_NOT_FOUND,
      );
    }

    const tokenPayload = { email: user.email, sub: user._id };

    return {
      email: user.email,
      name: user.name,
      // eslint-disable-next-line prettier/prettier
      token: this.jwtService.sign(tokenPayload, {secret: process.env.USER_JWT_SECRET_KEY})
    };

    return dto;
  }

  async register(dto: RegisterDto) {
    this.looger.debug('Register - Started');
    if (await this.userService.existsByEmail(dto.email)) {
      // eslint-disable-next-line prettier/prettier
      throw new BadRequestException(UserMessagesHelper.REGISTER_EXIST_EMAIL_ACCOUNT)
    }

    await this.userService.create(dto);
  }
}
