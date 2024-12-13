import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateParkingSpotDto {
  @IsString()
  @IsNotEmpty()
  spotNumber: string;

  
  @IsBoolean()
  isOccupied
}
