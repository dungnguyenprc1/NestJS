import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto, UserDto } from './dto/user.dto';
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
import { CrudRequestInterceptor } from '@nestjsx/crud';

@ApiTags('Auth')
@Controller('api/app/authorize')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  @HttpCode(200)
  @ApiOperation({ summary: 'Register' })
  signUp(@Body() userDto: UserDto): Promise<void> {
    return this.userService.createUser(userDto);
  }

  @Post('/login')
  @HttpCode(200)
  @UseInterceptors(TransformInterceptor)
  @ApiOperation({
    summary: 'Login',
    description: 'Returns the media statistics for the user',
  })
  @ResponseMessage('Okeee')
  signIn(@Body() loginDto: LoginDto) {
    return this.userService.signIn(loginDto);
  }

  @Get('test')
  @ApiProperty()
  @ApiSecurity('jwt')
  @UseInterceptors(CrudRequestInterceptor)
  // @Roles(Role.User)
  @UseGuards(JwtAuthGuard)
  test(@Request() req) {
    // console.log(process.env.)
    return req.user;
  }
}
