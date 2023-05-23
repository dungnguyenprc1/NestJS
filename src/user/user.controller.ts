import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
// import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthGuard } from 'src/auth/auth.guard';
// import { LocalAuthGuard } from 'src/auth/local-auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  signUp(@Body() userDto: UserDto): Promise<void> {
    return this.userService.createUser(userDto);
  }
  @Post('/login')
  signIn(@Body() userDto: UserDto) {
    return this.userService.signIn(userDto);
  }
  @Get('test')
  @UseGuards(JwtAuthGuard)
  test(@Request() req) {
    // console.log(req);
    return req.user;
  }
}
