import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from 'typeorm';
import { User } from './user.entity';
import { VehicleStatus } from './enums/vehicle-status.enum'

@Entity()
export class Vehicle extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  version: number;

  @Column()
  year: number;

  @Column()
  yearManufactory: number;

  @Column({
    type: 'enum',
    enum: VehicleStatus,
    default: VehicleStatus.PENDING
  })
  status: VehicleStatus;

  @Column('simple-array')
  gallery: string[];

  @Column()
  buyNowPrice: number;

  @Column()
  bidPrice: number;

  @Column({
    type: 'timestamptz',
    default: new Date()
  })
  expiresAt: Date;

  @Column({
    type: 'timestamptz',
    default: new Date()
  })
  createdAt: Date;

  @Column({
    type: 'timestamptz',
    default: new Date()
  })
  updatedAt: Date;

  @ManyToOne(
    () => User,
    user => user.vehicles,
    { eager: true }
  )
  user: User;
}
