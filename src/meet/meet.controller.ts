import {
  Controller,
  Request,
  Get,
  Post,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { MeetService } from './meet.service';
import { GetMeetDto } from './dtos/getmeet.dto';
import { CreateMeetDto } from './dtos/createmeet.dto';

@Controller('meet')
export class MeetController {
  constructor(private readonly service: MeetService) {}

  @Get()
  async getUser(@Request() req) {
    const { userId } = req?.user;

    const result = await this.service.getMeetsByUser(userId);

    return result.map(
      (m) =>
        ({
          id: m._id.toString(),
          name: m.name,
          color: m.color,
          link: m.link,
        } as GetMeetDto),
    );
  }

  @Post()
  async createMeet(@Request() req, @Body() dto: CreateMeetDto) {
    const { userId } = req?.user;
    await this.service.createMeet(userId, dto);
  }

  // Para a deleção devemos passar na url um :id
  @Delete(':id')
  async deleteMeet(@Request() req, @Param() params) {
    const { userId } = req?.user;
    const { id } = params;
    await this.service.deleteMeetByUser(userId, id);
  }
}
