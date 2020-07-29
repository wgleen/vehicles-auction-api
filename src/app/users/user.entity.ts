import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany
} from 'typeorm';
import { UserRoles } from './enums/user-roles.enum';
import { Vehicle } from '../vehicles/vehicle.entity';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column({ default: UserRoles.USER })
  role: UserRoles;

  @OneToMany(
    () => Vehicle,
    vehicle => vehicle.user,
    { eager: false }
  )
  vehicles: Vehicle[];

  isAdmin(): boolean {
    return this.role === UserRoles.ADMIN
  }
}
