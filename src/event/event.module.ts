import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { EventService } from 'src/database/repo/event.service';
import { Event } from 'src/database/model/event.model';

@Module({
  imports: [SequelizeModule.forFeature([Event])],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
