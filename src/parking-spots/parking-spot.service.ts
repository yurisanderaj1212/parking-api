import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParkingSpot } from './parking-spot.entity';
import { CreateParkingSpotDto } from './dto/create-parking-spot.dto';
import { UpdateParkingSpotDto } from './dto/update-parking-spot.dto';

@Injectable()
export class ParkingSpotService {
  constructor(
    @InjectRepository(ParkingSpot)
    private parkingSpotRepository: Repository<ParkingSpot>,
  ) {}

  async createParkingSpot(dto: CreateParkingSpotDto): Promise<ParkingSpot> {
    const parkingSpot = this.parkingSpotRepository.create(dto);
    return this.parkingSpotRepository.save(parkingSpot);
  }

  async findAll(): Promise<ParkingSpot[]> {
    return this.parkingSpotRepository.find();
  }

  async findOne(id: number): Promise<ParkingSpot> {
    const parkingSpot = await this.parkingSpotRepository.findOneBy({ id });
    if (!parkingSpot) {
      throw new NotFoundException('Parking spot not found');
    }
    return parkingSpot;
  }

  async updateParkingSpot(
    id: number,
    dto: UpdateParkingSpotDto,
  ): Promise<ParkingSpot> {
    const parkingSpot = await this.findOne(id);
    Object.assign(parkingSpot, dto);
    return this.parkingSpotRepository.save(parkingSpot);
  }

  async deleteParkingSpot(id: number): Promise<void> {
    const result = await this.parkingSpotRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Parking spot not found');
    }
  }
}
