import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";

export class UpdateTenantDto {

    @ApiProperty({
        example: 'TechStore Inc',
        description: 'Company or developer name'
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(30)
    name: string;

}