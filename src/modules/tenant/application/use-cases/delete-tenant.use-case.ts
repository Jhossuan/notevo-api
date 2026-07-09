import {ITenantRepository} from "../../domain/repositories/tenant.repository";

export class DeleteTenantUseCase {
    constructor(
        private readonly tenantRepository: ITenantRepository
    ) {}

    async execute(paramTenantId: string, reqTenantId: string){
        if(paramTenantId !== reqTenantId){
            throw new Error('tenantId invalid, you only have access to your own data')
        }

        const existingTenant = await this.tenantRepository.findById(paramTenantId);
        if(!existingTenant){
            throw new Error(`Tenant with id ${paramTenantId} not found`)
        }

        return await this.tenantRepository.deactivate(paramTenantId);
    }

}