import { Injectable, OnModuleInit } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class DBCheckService implements OnModuleInit {
  constructor(private sequelize: Sequelize) {}

  async onModuleInit() {
    try {
      await this.sequelize.authenticate();
      console.log('✅ Successfully connected to Neon Postgres');
    } catch (error) {
      console.error('❌ Failed to connect to Neon', error);
    }
  }
}
