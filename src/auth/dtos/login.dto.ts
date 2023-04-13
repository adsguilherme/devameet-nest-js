// DTO
// Data Transfer Object : Objeto de passagem/tráfego de dados

import { IsEmail, IsNotEmpty } from 'class-validator';
import { MessagesHelper } from '../helpers/messages.helper';

export class LoginDto {
  // Porque temos esse {} sem propriedades ?
  @IsEmail({}, { message: MessagesHelper.AUTH_LOGIN_NOT_FOUND }) // Esse recurso já elimina os Ifs que faziamos no NextJS.
  login: string;

  // E porque nesse contexto do IsNotEmpty temos apenas a propriedade { message } ?
  @IsNotEmpty({ message: MessagesHelper.AUTH_PASSWORD_NOT_FOUND })
  password: string;
}
