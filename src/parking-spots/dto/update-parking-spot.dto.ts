import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateParkingSpotDto {
  @IsBoolean()
  isOccupied?: boolean;
}
