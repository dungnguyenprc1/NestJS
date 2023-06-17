import { Sequelize } from 'sequelize';
import {
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { CurrentDiet, Gender, PetType } from './user.enum';
import { Exclude } from 'class-transformer';

@Table
export class User extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column
  membershipId: string;

  @Column
  petName: string;

  @Column({ defaultValue: Gender.MALE })
  gender: Gender;

  @Column({ defaultValue: PetType.CAT })
  petType: PetType;

  @Column
  breed: string;

  @Column({ defaultValue: DataType.NOW })
  birthDate: Date;

  @Column
  weight: number;

  @Column
  currentDiet: CurrentDiet;

  @Column
  preexistingConditions: string;

  @Column({ unique: true })
  @Exclude({ toPlainOnly: true })
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column
  password: string;

  @Column({ defaultValue: DataType.NOW })
  createdAt: Date;

  @Column({ type: 'varchar', allowNull: true, unique: true })
  refreshToken: string;
}
