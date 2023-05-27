import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserDto {
  @ApiProperty({ example: 'walter1@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @MinLength(4)
  email!: string;
  @ApiProperty({ example: '123123' })
  @IsNotEmpty()
  @IsString()
  password!: string;
}
