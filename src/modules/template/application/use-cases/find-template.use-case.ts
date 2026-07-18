import {ITemplateRepository} from "../../domain/repositories/template.repository";

export class FindTemplateUseCase {
    constructor(
        private readonly templateRepository: ITemplateRepository
    ) {}

    async execute(templateId: string, tenantId: string){
        const template = await this.templateRepository.findById(templateId, tenantId);
        if(!template){
            throw new Error("Template not found");
        }

        return template;
    }
}