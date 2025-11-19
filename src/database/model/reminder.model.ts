import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import { User } from './user.model';

@Table
export class Reminder extends Model {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column(DataType.STRING)
  title: string;

  @Column(DataType.DATE)
  reminderTime: Date;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  notified: boolean;
}
