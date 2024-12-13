import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ParkingSpot } from '../parking-spots/parking-spot.entity';
import { Vehicle } from '../vehicles/vehicle.entity';
import { User } from '../users/user.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    @InjectRepository(ParkingSpot)
    private parkingSpotRepository: Repository<ParkingSpot>,
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createReservation(dto: CreateReservationDto): Promise<Reservation> {
    const { startTime, endTime, parkingSpotId, vehicleId, userId } = dto;

    const parkingSpot = await this.parkingSpotRepository.findOneBy({ id: parkingSpotId });
    if (!parkingSpot) {
      throw new NotFoundException('Parking spot not found');
    }

    if (parkingSpot.isOccupied) {
      throw new BadRequestException('Parking spot is already occupied');
    }

    const vehicle = await this.vehicleRepository.findOneBy({ id: vehicleId });
    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const reservation = this.reservationRepository.create({
      startTime,
      endTime,
      parkingSpot,
      vehicle,
      user,
    });

    parkingSpot.isOccupied = true; // Marcar la plaza como ocupada
    await this.parkingSpotRepository.save(parkingSpot);

    return this.reservationRepository.save(reservation);
  }

  async findAll(): Promise<Reservation[]> {
    return this.reservationRepository.find({
      relations: ['parkingSpot', 'vehicle', 'user'],
    });
  }

  async findOne(id: number): Promise<Reservation> {
    const reservation = await this.reservationRepository.findOne({
      where: { id },
      relations: ['parkingSpot', 'vehicle', 'user'],
    });
    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }
    return reservation;
  }

  async cancelReservation(id: number): Promise<void> {
    const reservation = await this.findOne(id);

    reservation.parkingSpot.isOccupied = false; // Marcar la plaza como desocupada
    await this.parkingSpotRepository.save(reservation.parkingSpot);

    await this.reservationRepository.delete(id);
  }
}
