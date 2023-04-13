import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { MessagesHelper } from './helpers/messages.helper';
import { RegisterDto } from 'src/user/dtos/register.dto';
import { UserService } from 'src/user/user.service';
import { UserMessagesHelper } from 'src/user/helpers/messages.helper';

@Injectable() // Isso é um decorator e o Nest irá fazer a gestão das instâncias dos objetos
export class AuthService {
  private looger = new Logger(AuthService.name);

  constructor(private readonly userService: UserService) {}

  login(dto: LoginDto) {
    this.looger.debug('Login - Started');
    if (dto.login !== 'teste@teste.com' || dto.password !== 'teste@123') {
      throw new BadRequestException(
        MessagesHelper.AUTH_PASSWORD_OR_LOGIN_NOT_FOUND,
      );
    }
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
