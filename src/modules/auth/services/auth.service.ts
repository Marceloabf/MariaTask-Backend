import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { JwtPayload } from '../interfaces/jwt-payload';
import { UserService } from '../../user/services/user.service'; 

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async login(user: CreateUserDto) {
    const foundUser = await this.userService.findOneByEmail(user.email);

    if (!foundUser || !(await bcrypt.compare(user.password, foundUser.password))) {
      throw new UnauthorizedException('Invalid credentials'); 
    }

    const payload: JwtPayload = { username: foundUser.name, sub: foundUser.id };

    return {
      userId: foundUser.id,
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    const existingUser = await this.userService.findOneByEmail(email);

    if (existingUser) {
      throw new ConflictException('Email already in use'); 
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userService.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const payload: JwtPayload = { username: newUser.name, sub: newUser.id };

    return {
      user: newUser,
      access_token: this.jwtService.sign(payload),
    };
  }
}
