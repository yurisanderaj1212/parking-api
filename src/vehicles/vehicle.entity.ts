import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column( {unique: true} )
  licensePlate: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @ManyToOne(() => User, user => user.vehicles)
  owner: User;
}