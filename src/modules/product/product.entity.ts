// Dependencies
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

// Entities
import { User } from '../user/user.entity';

/**
 * Export product
 *
 * @class Product
 * */
@Entity({ name: 'products' })
export class Product {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ unique: true, nullable: false })
  productName: string;

  @ApiProperty()
  @Column({ nullable: false })
  cost: number;

  @ApiProperty()
  @Column({ nullable: false })
  amountAvailable: number;

  @ManyToOne(() => User)
  @JoinColumn()
  seller: User;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamp', nullable: false })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  updatedAt: Date;
}
