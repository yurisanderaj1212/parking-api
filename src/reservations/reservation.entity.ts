import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Vehicle } from '../vehicles/vehicle.entity';
import { ParkingSpot } from '../parking-spots/parking-spot.entity';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @ManyToOne(() => User, user => user.reservations)
  user: User;

  @ManyToOne(() => Vehicle)
  vehicle: Vehicle;

  @ManyToOne(() => ParkingSpot, parkingSpot => parkingSpot.reservations)
  parkingSpot: ParkingSpot;
}