import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../model/user.model';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from 'src/dto/users.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private jwtService: JwtService,
  ) {}

  generateToken(user: User) {
    const payload: { sub: string; email: string; name: string } = {
      sub: String(user.id),
      email: String(user.email),
      name: String(user.name),
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(body: RegisterDto) {
    const existing = await this.userModel.findOne({
      where: { email: body.email },
    });
    if (existing) throw new UnauthorizedException('Email already exists');

    const hashed = await bcrypt.hash(body.password, 10);

    const user = await this.userModel.create({
      name: body.name,
      email: body.email,
      password: hashed,
    });

    return this.generateToken(user);
  }

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ where: { email } });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    return this.generateToken(user);
  }
}
