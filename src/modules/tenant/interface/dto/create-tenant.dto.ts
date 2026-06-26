import {IsEmail, IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";

export class CreateTenantDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(30)
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(10)
    password: string;

    @IsString()
    @IsNotEmpty()
    planId: string;

}