import {ITenantRepository} from "../../domain/repositories/tenant.repository";
import {IPagination} from "../../../../shared/interfaces/pagination.interface";

export class FindTenantsUseCase {
    constructor(
        private readonly tenantRepository: ITenantRepository,
    ) {}

    async execute(dto: IPagination) {
        const { page, limit } = dto
        return await this.tenantRepository.findAll(page, limit)
    }

}