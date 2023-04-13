import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { MessagesHelper } from './helper/messages.helper';

@Injectable() // Isso é um decorator e o Nest irá fazer a gestão das instâncias dos objetos
export class AuthService {
  login(dto: LoginDto) {
    if (dto.login !== 'teste@teste.com' || dto.password !== 'teste@123') {
      throw new BadRequestException(
        MessagesHelper.AUTH_PASSWORD_OR_LOGIN_NOT_FOUND,
      );
    }
    return dto;
  }
}
