import { Module } from '@nestjs/common';
import { MeetController } from './meet.controller';
import { MeetService } from './meet.service';

@Module({
  // eslint-disable-next-line prettier/prettier
  controllers: [MeetController],
  providers: [MeetService],
})
export class MeetModule {}
