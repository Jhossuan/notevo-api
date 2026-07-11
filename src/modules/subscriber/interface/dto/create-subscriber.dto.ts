import {IsEmail, IsNotEmpty, IsOptional, IsString} from "class-validator";

export class CreateSubscriberDto {

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    externalId: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    firstName?: string | null

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    lastName?: string | null

    @IsString()
    @IsEmail()
    @IsOptional()
    @IsNotEmpty()
    email?: string | null

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    phone?: string | null

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    metadata?: Record<string, any> | null

}