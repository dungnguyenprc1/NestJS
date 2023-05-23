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
import { MembershipType, Salutation, StatusMembership } from './user.enum';

@Table
export class User extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column
  membershipId: string;

  @Column({ allowNull: true })
  membershipType: MembershipType;

  @Column({ allowNull: true })
  status: StatusMembership;

  @Column({ allowNull: true })
  salutation: Salutation;

  @Column({ allowNull: true })
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column({ allowNull: true })
  mobilePhone: string;

  @Column({ allowNull: true })
  countryCode: string;

  @Column
  password: string;

  @Column({ allowNull: true })
  dateOfBirth: Date;

  @Column({ allowNull: true })
  designation: string;

  @Column({ allowNull: true })
  department: string;

  @Column({ allowNull: true })
  address: string;

  @Column({ allowNull: true })
  address2: string;

  @Column({ allowNull: true })
  postalCode: string;

  @Column({ allowNull: true })
  unitNo: string;

  @Column({ allowNull: true })
  sbnNo: string;

  @Column({ allowNull: true })
  country: string;

  @Column({ allowNull: true })
  nursesChapterId: number;

  @Column({ defaultValue: DataType.NOW, allowNull: false })
  createdAt: Date;
}
