import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Reservation } from '../reservations/reservation.entity';
import { Vehicle } from 'src/vehicles/vehicle.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'employee', 'client'],
    default: 'client'
  })
  role: string;

  @OneToMany(() => Reservation, reservation => reservation.user)
  reservations: Reservation[];

  @OneToMany(() => Vehicle, vehicle => vehicle.owner)
  vehicles: Vehicle[];

}