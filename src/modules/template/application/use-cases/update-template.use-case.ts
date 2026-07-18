import {ITemplateRepository} from "../../domain/repositories/template.repository";
import {ChannelEnum} from "../../domain/entities/template.entity";

interface IUpdateTemplateDto {
    name?: string
    channel?: ChannelEnum
    subject?: string
    body?: string
    variables?: string[]
}

export class UpdateTemplateUseCase {
    constructor(
        private readonly templateRepository: ITemplateRepository,
    ) {}

    async execute(dto: IUpdateTemplateDto, tenantId: string, templateId: string) {
        const existingTemplate = await this.templateRepository.findById(templateId, tenantId);
        if(!existingTemplate) {
            throw new Error(`Template with id ${templateId} not found`)
        }

        if(dto.name) existingTemplate.name = dto.name
        if(dto.channel) existingTemplate.channel = dto.channel
        if(dto.subject) existingTemplate.subject = dto.subject
        if(dto.body) existingTemplate.body = dto.body
        if(dto.variables) existingTemplate.variables = dto.variables

        return await this.templateRepository.update(existingTemplate)
    }
}