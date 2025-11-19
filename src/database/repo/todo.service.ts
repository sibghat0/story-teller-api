import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Todo } from '../model/todo.model';
import { CreateTodoDto, UpdateTodoDto } from '../../dto/todo.dto';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo) private todoModel: typeof Todo) {}

  async create(userId: number, dto: CreateTodoDto) {
    const data = await this.todoModel.create({ userId, ...dto });
    if (data) {
      return { data, message: 'Todo list created successfully' };
    } else {
      return { message: 'Failed to create todo list' };
    }
  }

  async findAll(userId: number) {
    const data = await this.todoModel.findAll({ where: { userId } });
    if (data) {
      return { data, message: 'Todo lists retrieved successfully' };
    } else {
      return { message: 'No todo lists found' };
    }
  }

  async update(id: number, userId: number, dto: UpdateTodoDto) {
    await this.todoModel.update(dto, { where: { id, userId } });
    return this.todoModel.findByPk(id);
  }

  async remove(id: number, userId: number) {
    const deleted = await this.todoModel.destroy({ where: { id, userId } });
    if (deleted) {
      return { id, message: `deleted the todo list ${id}` };
    } else {
      return { message: `no todo list found with id ${id}` };
    }
  }
}
