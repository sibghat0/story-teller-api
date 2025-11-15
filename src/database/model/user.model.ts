import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'Users' })
export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;
}
