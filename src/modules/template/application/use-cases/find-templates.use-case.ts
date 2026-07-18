import {ITemplateRepository} from "../../domain/repositories/template.repository";
import {IPagination} from "../../../../shared/interfaces/pagination.interface";

export class FindTemplatesUseCase {
    constructor(
        private readonly templateRepository: ITemplateRepository,
    ) {}

    async execute(dto: IPagination, tenantId: string) {
        const { page, limit } = dto
        return await this.templateRepository.findAll(tenantId, page, limit);
    }

}