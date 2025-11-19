import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { EventService } from '../database/repo/event.service';
import { CreateEventDto, UpdateEventDto } from '../dto/event.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('event')
@UseGuards(AuthGuard('jwt'))
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  create(@Req() req, @Body() dto: CreateEventDto) {
    return this.eventService.create(req.user.userId, dto);
  }

  @Get()
  findAll(@Req() req) {
    return this.eventService.findAll(req.user.userId);
  }

  @Patch(':id')
  update(@Req() req, @Param('id') id: string, @Body() dto: UpdateEventDto) {
    return this.eventService.update(+id, req.user.userId, dto);
  }

  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    return this.eventService.remove(+id, req.user.userId);
  }
}
