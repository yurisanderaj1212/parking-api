import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Reservation } from '../reservations/reservation.entity';

@Entity()
export class ParkingSpot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  spotNumber: string;

  @Column({nullable : false})
  isOccupied: boolean;

  @OneToMany(() => Reservation, reservation => reservation.parkingSpot)
  reservations: Reservation[];
}

