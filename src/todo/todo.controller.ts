import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodoService } from '../database/repo/todo.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateTodoDto, UpdateTodoDto } from '../dto/todo.dto';

@Controller('todo')
@UseGuards(AuthGuard('jwt'))
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Req() req: { user: { userId: number } }, @Body() dto: CreateTodoDto) {
    return this.todoService.create(req.user.userId, dto);
  }

  @Get()
  findAll(@Req() req: { user: { userId: number } }) {
    return this.todoService.findAll(req.user.userId);
  }

  @Patch(':id')
  update(
    @Req() req: { user: { userId: number } },
    @Param('id') id: string,
    @Body() dto: UpdateTodoDto,
  ) {
    return this.todoService.update(+id, req.user.userId, dto);
  }

  @Delete(':id')
  remove(@Req() req: { user: { userId: number } }, @Param('id') id: string) {
    return this.todoService.remove(+id, req.user.userId);
  }
}
