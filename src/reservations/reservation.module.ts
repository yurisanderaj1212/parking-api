import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './reservation.entity';
import { ParkingSpot } from '../parking-spots/parking-spot.entity';
import { Vehicle } from '../vehicles/vehicle.entity';
import { User } from '../users/user.entity';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, ParkingSpot, Vehicle, User])],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
