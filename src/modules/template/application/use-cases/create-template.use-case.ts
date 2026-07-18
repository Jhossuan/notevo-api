import {ITemplateRepository} from "../../domain/repositories/template.repository";
import {ChannelEnum, Template} from "../../domain/entities/template.entity";

interface ICreateTemplateDto {
    name: string;
    channel: ChannelEnum;
    subject?: string | null;
    body: string;
    variables: string[];
}

export class CreateTemplateUseCase {
    constructor(
        private readonly templateRepository: ITemplateRepository,
    ) {}

    async execute(dto: ICreateTemplateDto, tenantId: string){
        const { name, channel, subject, body, variables } = dto;

        const template = Template.create({
            tenantId,
            name,
            channel,
            subject,
            body,
            variables,
        })

        return this.templateRepository.create(template);
    }
}