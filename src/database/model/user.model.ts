// user.model.ts
import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column({ allowNull: true })
  name: string;

  @Column({ unique: true, allowNull: true })
  email: string;

  @Column({ allowNull: true })
  password: string; // hashed for local users

  @Column({ allowNull: true })
  provider: string; // 'google' | 'facebook' | 'local'

  @Column({ allowNull: true })
  providerId: string; // provider user id

  // optional hook to hash password before save if you like
  // or hash in service when creating.
}
