import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Event } from '../model/event.model';
import { CreateEventDto, UpdateEventDto } from '../../dto/event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event) private eventModel: typeof Event, // <--- THIS MUST MATCH EventModule
  ) {}

  create(userId: number, dto: CreateEventDto) {
    return this.eventModel.create({ userId, ...dto });
  }

  findAll(userId: number) {
    return this.eventModel.findAll({ where: { userId } });
  }

  update(id: number, userId: number, dto: UpdateEventDto) {
    return this.eventModel.update(dto, { where: { id, userId } });
  }

  remove(id: number, userId: number) {
    return this.eventModel.destroy({ where: { id, userId } });
  }
}
