import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Meet, MeetDocument } from './schemas/meet.schema';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { CreateMeetDto } from './dtos/createmeet.dto';
import { generateLink } from './helpers/linkgenerator.helper';
import { MeetObject, MeetObjectDocument } from './schemas/meetobject.schema';
import { UpdateMeetDto } from './dtos/updatemeet.dto';
import { MeetMessagesHelper } from './helpers/meetmessages.helper';

@Injectable()
export class MeetService {
  private readonly logger = new Logger(MeetService.name);

  constructor(
    @InjectModel(Meet.name) private readonly model: Model<MeetDocument>,
    // eslint-disable-next-line prettier/prettier
    @InjectModel(MeetObject.name) private readonly objectModel: Model<MeetObjectDocument>,
    private readonly userService: UserService,
  ) {}

  async getMeetsByUser(userId: string) {
    this.logger.debug('getMeetsByUser - ' + userId);
    return await this.model.find({ user: userId });
  }

  async createMeet(userId: string, dto: CreateMeetDto) {
    this.logger.debug('createMeet - ' + userId);

    const user = await this.userService.getUserById(userId);

    const meet = {
      // spread operator
      ...dto,
      user,
      link: generateLink(),
    };

    this.logger.debug('create - meet before save', meet);

    const createdMeet = new this.model(meet);
    return await createdMeet.save();
  }

  // Como poderia ser implementado no delete para quando fosse executada uma request e não fosse entrado o id, apresentasse alguma mensagem ao usuário e o status em vez de 200 ser um 404 ?
  async deleteMeetByUser(userId: string, meetId: string) {
    this.logger.debug(`deleteMeetByUser - ${userId} - ${meetId}`);
    return await this.model.deleteOne({ user: userId, _id: meetId });
  }

  async getMeetObjects(meetId: string, userId: string) {
    this.logger.debug(`getMeetObjects - ${userId} - ${meetId}`);
    const user = await this.userService.getUserById(userId);
    const meet = await this.model.findOne({ user, _id: meetId });

    return await this.objectModel.find({ meet });
  }

  // Recebemos dados do id da reunião, id do usuário e demais dados
  async update(meetId: string, userId: string, dto: UpdateMeetDto) {
    this.logger.debug(`update - ${userId} - ${meetId}`);
    const user = await this.userService.getUserById(userId); // Buscamos usuário
    const meet = await this.model.findOne({ user, _id: meetId }); // Buscamos reunião do usuário

    // Se a reunião não for do usuário retorna uma BadRequest
    if (!meet) {
      throw new BadRequestException(MeetMessagesHelper.UPDATE_MEET_NOT_FOUND);
    }

    // Altera dados principais da reunião (nome e cor)
    meet.name = dto.name;
    meet.color = dto.color;
    await this.model.findByIdAndUpdate({ _id: meetId }, meet);

    // Remove todos os objetos anteriores
    await this.objectModel.deleteMany({ meet });

    let objectPayload;
    // Percorre todos os objetos atuais que vierão no dto
    for (const object of dto.objects) {
      objectPayload = {
        meet,
        ...object,
      };
      // Cria os objetos e salva no banco
      await this.objectModel.create(objectPayload);
    }
  }
}
