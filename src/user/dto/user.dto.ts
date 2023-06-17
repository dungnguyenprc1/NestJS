import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
  isEnum,
} from 'class-validator';
import { CurrentDiet, Gender, PetType } from '../user.enum';
import { Transform } from 'class-transformer';

export class LoginDto {
  @ApiProperty({ example: 'walter1@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @MinLength(4)
  @Transform(({ value }) => value.toLowerCase())
  email!: string;

  @ApiProperty({ example: '123123' })
  @IsNotEmpty()
  @IsString()
  password!: string;
}

export class UserDto {
  @ApiProperty({ example: 'walter1@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @MinLength(4)
  @Transform(({ value }) => value.toLowerCase())
  email!: string;

  @ApiProperty({ example: '123123' })
  @IsNotEmpty()
  @IsString()
  password!: string;

  @ApiProperty({ example: Gender.FEMALE })
  @IsNotEmpty()
  @IsEnum(Gender)
  gender!: Gender;

  @ApiProperty({ example: PetType.CAT })
  @IsNotEmpty()
  @IsEnum(PetType)
  petType!: PetType;

  @ApiProperty({ example: 'Domestic ShortHair' })
  breed?: string;

  @IsNotEmpty()
  birthDate!: Date;

  @IsNotEmpty()
  @ApiProperty({ example: 'Con Chó là Con Mèo' })
  petName!: string;

  @IsNotEmpty()
  @ApiProperty({ example: '20' })
  weight!: number;

  @ApiProperty({ example: CurrentDiet.DRY_FOOD })
  @IsNotEmpty()
  @IsEnum(CurrentDiet)
  currentDiet!: CurrentDiet;

  @ApiProperty({ example: 'Conditions' })
  preexistingConditions?: string;
}
