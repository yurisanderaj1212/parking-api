import { UserModule } from './users/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { databaseConfig } from './config/database.config';
import { User } from './users/user.entity';
import { Vehicle } from './vehicles/vehicle.entity';
import { ParkingSpot } from './parking-spots/parking-spot.entity';
import { Reservation } from './reservations/reservation.entity';
import { Log } from './logs/log.entity';
import { VehicleModule } from './vehicles/vehicle.module';
import { ParkingSpotModule } from './parking-spots/parking-spot.module';
import { ReservationModule } from './reservations/reservation.module';
import { LogModule } from './logs/log.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...databaseConfig,
      entities: [User, Vehicle, ParkingSpot, Reservation, Log],
    }),
    AuthModule,
    UserModule,
    VehicleModule,
    ParkingSpotModule,
    ReservationModule,
    LogModule
  ],
  controllers: [
    AppController],
  providers: [
    AppService],
})
export class AppModule { }