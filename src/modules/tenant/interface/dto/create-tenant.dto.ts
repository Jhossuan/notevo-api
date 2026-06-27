import {IsEmail, IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateTenantDto {

    @ApiProperty({
        example: 'TechStore Inc',
        description: 'Company or developer name'
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(30)
    name: string;

    @ApiProperty({
        example: 'your@email.com',
        description: 'Company or developer email'
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'a0KLLxf*dU12c',
        description: 'Your secret password'
    })
    @IsString()
    @MinLength(10)
    password: string;

    @ApiProperty({
        example: '550e8400-e29b-41d4-a716-446655440000',
        description: 'Identification of the plan selected'
    })
    @IsString()
    @IsNotEmpty()
    planId: string;

}