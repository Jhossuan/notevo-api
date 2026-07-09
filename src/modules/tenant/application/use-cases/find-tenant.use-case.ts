import {ITenantRepository} from "../../domain/repositories/tenant.repository";

export class FindTenantUseCase {
    constructor(
        private readonly tenantRepository: ITenantRepository,
    ) {}

    async execute(paramTenantId: string, reqTenantId: string) {
        if(paramTenantId !== reqTenantId){
            throw new Error('tenantId invalid, you only have access to your own data')
        }
        const tenant = await this.tenantRepository.findById(paramTenantId);
        if(!tenant){
            throw new Error("Tenant not found");
        }
        return tenant;
    }

}