import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';

import { User } from './user.model';
import { LoginDto, UserDto } from './dto/user.dto';
import { UniqueConstraintError } from 'sequelize';
import { JwtPayload } from 'src/auth/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private jwtService: JwtService,
  ) {}
  async createUser(userDto: UserDto): Promise<void> {
    try {
      const {
        email,
        password,
        gender,
        petType,
        breed,
        birthDate,
        weight,
        currentDiet,
        preexistingConditions,
        petName,
      } = userDto;
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      console.log('hash', hashedPassword);
      await this.userModel.create({
        email,
        password: hashedPassword,
        gender,
        petType,
        breed,
        birthDate,
        weight,
        currentDiet,
        preexistingConditions,
        petName,
      });
    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        throw new ConflictException('User already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  async signIn(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { email };
      const accessToken: string = this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check password');
    }
  }
}
