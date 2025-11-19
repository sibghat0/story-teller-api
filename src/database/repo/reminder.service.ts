import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Reminder } from '../model/reminder.model';
import { CreateReminderDto, UpdateReminderDto } from '../../dto/reminder.dto';

@Injectable()
export class ReminderService {
  constructor(@InjectModel(Reminder) private reminderModel: typeof Reminder) {}

  create(userId: number, dto: CreateReminderDto) {
    return this.reminderModel.create({ userId, ...dto });
  }

  findAll(userId: number) {
    return this.reminderModel.findAll({ where: { userId } });
  }

  update(id: number, userId: number, dto: UpdateReminderDto) {
    return this.reminderModel.update(dto, { where: { id, userId } });
  }

  remove(id: number, userId: number) {
    return this.reminderModel.destroy({ where: { id, userId } });
  }
}
