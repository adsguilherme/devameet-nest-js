// DTO
// Data Transfer Object : Objeto de passagem/tráfego de dados

import { IsEmail, IsNotEmpty } from 'class-validator';
import { MessagesHelper } from '../helper/messages.helper';

export class LoginDto {
  @IsEmail({}, { message: MessagesHelper.AUTH_LOGIN_NOT_FOUND }) // Esse recurso já elimina os Ifs que faziamos no NextJS.
  login: string;

  @IsNotEmpty({ message: MessagesHelper.AUTH_PASSWORD_NOT_FOUND })
  password: string;
}
