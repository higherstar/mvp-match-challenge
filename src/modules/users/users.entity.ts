// Dependencies
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

// Constants
import { Roles } from '../../shared/constants/global.constants';

/**
 * Export user
 *
 * @class User
 * */
@Entity({ name: 'users' })
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ unique: true, nullable: false })
  email: string;

  @ApiProperty()
  @Column({ nullable: false })
  password: string;

  @ApiProperty()
  @Column({ type: 'enum', enum: Roles })
  role: Roles;

  @ApiProperty()
  @Column({ nullable: false })
  deposit: number;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamp', nullable: false })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  updatedAt: Date;
}
