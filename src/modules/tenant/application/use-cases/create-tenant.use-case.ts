import {ITenantRepository} from "../../domain/repositories/tenant.repository";
import {Tenant} from '../../domain/entities/tenant.entity'
import {IPasswordHasherRepository} from "../services/password/password-hasher.repository";
import {IApiKeyGenerator} from "../services/api-key/api-key-generator";
import {IApiKeyRepository} from "../../domain/repositories/api-key.repository";
import {ApiKey} from "../../domain/entities/api-key.entity";

interface ICreateTenantDto {
    name: string,
    email: string,
    password: string,
    planId: string,
}

export class CreateTenantUseCase {
    constructor(
        private readonly tenantRepository: ITenantRepository,
        private readonly passwordHasher: IPasswordHasherRepository,
        private readonly apiKeyGenerator: IApiKeyGenerator,
        private readonly apiKeyRepository: IApiKeyRepository
    ) {}

    async execute(dto: ICreateTenantDto) {
        const { name, email, password, planId } = dto

        const existing = await this.tenantRepository.findByEmail(email)
        if(existing) throw new Error('Email already exists')

        const hashedPassword = await this.passwordHasher.hash(password);
        const tenant = Tenant.create({ name, email, password: hashedPassword, planId })
        const savedTenant = await this.tenantRepository.create(tenant)

        const apiKey = await this.apiKeyGenerator.generate();
        const newApiKey = ApiKey.create({ hashedKey: apiKey.hashed, prefix: apiKey.prefix, name: "Default Key" });
        await this.apiKeyRepository.create(newApiKey, savedTenant.id)

        return {
            tenant: savedTenant,
            apiKey: apiKey.plain,
        }
    }

}