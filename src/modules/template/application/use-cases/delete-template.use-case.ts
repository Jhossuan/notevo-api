import {ITemplateRepository} from "../../domain/repositories/template.repository";

export class DeleteTemplateUseCase {
    constructor(
        private readonly templateRepository: ITemplateRepository
    ) {}

    async execute(templateId: string, tenantId: string) {
        const existingTemplate = await this.templateRepository.findById(templateId, tenantId);
        if(!existingTemplate) {
            throw new Error("Template not found");
        }

        return this.templateRepository.delete(templateId);
    }
}