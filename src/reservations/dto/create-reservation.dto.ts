import { IsNotEmpty, IsDateString, IsInt } from 'class-validator';

export class CreateReservationDto {
  @IsNotEmpty()
  @IsDateString()
  startTime: string;

  @IsNotEmpty()
  @IsDateString()
  endTime: string;

  @IsInt()
  @IsNotEmpty()
  parkingSpotId: number;

  @IsInt()
  @IsNotEmpty()
  vehicleId: number;

  @IsInt()
  @IsNotEmpty()
  userId: number;
}
