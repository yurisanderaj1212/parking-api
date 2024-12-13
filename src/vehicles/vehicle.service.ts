import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { User } from '../users/user.entity';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createVehicle(dto: CreateVehicleDto): Promise<Vehicle> {
    const owner = await this.userRepository.findOneBy({ id: dto.ownerId });
    if (!owner) {
      throw new NotFoundException('Owner not found');
    }

    const vehicle = this.vehicleRepository.create({
      licensePlate: dto.licensePlate,
      brand: dto.brand,
      model: dto.model,
      owner,
    });

    return this.vehicleRepository.save(vehicle);
  }

  async findAll(): Promise<Vehicle[]> {
    return this.vehicleRepository.find({ relations: ['owner'] });
  }

  async findOne(id: number): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findOne({
      where: { id },
      relations: ['owner'],
    });
    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }
    return vehicle;
  }

  async deleteVehicle(id: number): Promise<void> {
    const result = await this.vehicleRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Vehicle not found');
    }
  }
}
