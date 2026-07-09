import {ITenantRepository} from "../../domain/repositories/tenant.repository";

interface IUpdateTenantDto {
    name?: string;
    planId?: string
}

export class UpdateTenantUseCase {
    constructor(
        private readonly tenantRepository: ITenantRepository
    ) {}

    async execute(dto: IUpdateTenantDto, paramTenantId: string, reqTenantId: string){
        if(paramTenantId !== reqTenantId){
            throw new Error('tenantId invalid, you only have access to your own data')
        }

        const existingTenant = await this.tenantRepository.findById(paramTenantId);
        if(!existingTenant){
            throw new Error(`Tenant with id ${paramTenantId} not found`)
        }

        if(dto.name) existingTenant.name = dto.name
        if(dto.planId) existingTenant.planId = dto.planId

        return await this.tenantRepository.update(existingTenant);
    }
}