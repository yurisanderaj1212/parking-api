import { IsString, IsNotEmpty } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  @IsNotEmpty()
  licensePlate: string;

  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsNotEmpty()
  ownerId: number; // ID del usuario que posee el vehículo
}
