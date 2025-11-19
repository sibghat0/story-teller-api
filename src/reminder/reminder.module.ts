import { Module } from '@nestjs/common';
import { ReminderController } from './reminder.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Reminder } from 'src/database/model/reminder.model';
import { ReminderService } from 'src/database/repo/reminder.service';

@Module({
  imports: [SequelizeModule.forFeature([Reminder])],
  controllers: [ReminderController],
  providers: [ReminderService],
})
export class ReminderModule {}
