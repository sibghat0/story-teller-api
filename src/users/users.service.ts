import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/database/model/user.model';
import { UserDto } from 'src/dto/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  createUser(data: { name: string; email: string }) {
    return this.userModel.create(data);
  }

  getUsers() {
    return this.userModel.findAll();
  }

  getUser(id: number) {
    return this.userModel.findByPk(id);
  }

  updateUser(id: number, data: UserDto) {
    return this.userModel.update(data, { where: { id } });
  }

  deleteUser(id: number) {
    return this.userModel.destroy({ where: { id } });
  }
}
