import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { DBCheckService } from './Checker/db.checker';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      uri: process.env.DEV_USER_DB,
      autoLoadModels: true,
      synchronize: true,
      sync: { alter: true },
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, DBCheckService],
})
export class AppModule {}
