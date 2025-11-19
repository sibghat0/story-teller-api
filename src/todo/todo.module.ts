import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Todo } from 'src/database/model/todo.model';
import { TodoService } from 'src/database/repo/todo.service';

@Module({
  imports: [SequelizeModule.forFeature([Todo])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
