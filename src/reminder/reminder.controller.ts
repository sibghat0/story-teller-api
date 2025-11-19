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
import { Request } from 'express';
import { ReminderService } from '../database/repo/reminder.service';
import { CreateReminderDto, UpdateReminderDto } from '../dto/reminder.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('reminder')
@UseGuards(AuthGuard('jwt'))
export class ReminderController {
  constructor(private readonly reminderService: ReminderService) {}
  @Post()
  create(
    @Req() req: Request & { user: { userId: number } },
    @Body() dto: CreateReminderDto,
  ) {
    return this.reminderService.create(req.user.userId, dto);
  }

  @Get()
  findAll(@Req() req: Request & { user: { userId: number } }) {
    return this.reminderService.findAll(req.user.userId);
  }

  @Patch(':id')
  update(
    @Req() req: Request & { user: { userId: number } },
    @Param('id') id: string,
    @Body() dto: UpdateReminderDto,
  ) {
    return this.reminderService.update(+id, req.user.userId, dto);
  }

  @Delete(':id')
  remove(
    @Req() req: Request & { user: { userId: number } },
    @Param('id') id: string,
  ) {
    return this.reminderService.remove(+id, req.user.userId);
  }
}
