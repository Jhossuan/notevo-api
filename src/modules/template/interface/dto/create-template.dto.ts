import {IsArray, IsEnum, IsNotEmpty, IsOptional, IsString} from "class-validator";
import {ChannelEnum} from "../../domain/entities/template.entity";

export const ChannelList = [
    ChannelEnum.EMAIL,
    ChannelEnum.WEBHOOK,
    ChannelEnum.IN_APP,
]

export class CreateTemplateDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEnum(ChannelEnum, { message: `channel options available are ${ChannelList}` })
    channel: ChannelEnum;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    subject?: string = null;

    @IsString()
    @IsNotEmpty()
    body: string;

    @IsArray()
    @IsString({ each: true })
    variables: string[]

}