import { Transform } from "class-transformer";
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";


export class RegisterDto {

    @IsString()
    @MinLength(1)
    username: string;
    
    @IsString()
    @MaxLength(6)
    password: string;

    @IsEmail()
    email: string;
  
}