import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
// import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from './user.enum';
import {
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { TransformInterceptor } from 'src/shared/file/responses/interceptors.interceptor';
import { ResponseMessage } from 'src/shared/file/responses/response_message.decorator';
// import { LocalAuthGuard } from 'src/auth/local-auth.guard';

@ApiTags('Auth')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  @ApiOperation({ summary: 'Register' })
  signUp(@Body() userDto: UserDto): Promise<void> {
    return this.userService.createUser(userDto);
  }
  @Post('/login')
  @UseInterceptors(TransformInterceptor)
  @ApiOperation({
    summary: 'Login',
    description: 'Returns the media statistics for the user',
  })
  @ResponseMessage('Okeee')
  // @ApiOkResponse({type: Standa})
  signIn(@Body() userDto: UserDto) {
    return this.userService.signIn(userDto);
  }
  @Get('test')
  @ApiProperty()
  @ApiSecurity('jwt')
  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  test(@Request() req) {
    return req.user;
  }
}
