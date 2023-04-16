import { Matches, MinLength } from 'class-validator';
import { MeetMessagesHelper } from '../helpers/meetmessages.helper';

export class CreateMeetDto {
  @MinLength(2, { message: MeetMessagesHelper.CREATE_NAME_NOT_VALID })
  name: string;

  // 3,6 podemos passar um valor da cor em hexa com 3 (fff) ou 6 (fff12ac) digitos.
  @Matches(/[0-9A-Fa-f]{3,6}/g, {
    message: MeetMessagesHelper.CREATE_COLOR_NOT_VALID,
  })
  color: string;
}
