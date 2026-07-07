import {Module} from "@nestjs/common";
import {TenantController} from "./tenant.controller";
import {PrismaModule} from "../../../shared/infrastructure/persistence/prisma.module";
import {TENANT_REPOSITORY_TOKEN} from "../domain/tokens/tenant.tokens";
import {PrismaTenantRepository} from "../infrastructure/repositories/prisma-tenant.repository";
import {PASSWORD_HASHER_TOKEN} from "../application/services/password/password-hasher.tokens";
import {BcryptPasswordHasher} from "../infrastructure/services/bcrypt-password-hasher";
import {CreateTenantUseCase} from "../application/use-cases/create-tenant.use-case";
import {ITenantRepository} from "../domain/repositories/tenant.repository";
import {IPasswordHasherRepository} from "../application/services/password/password-hasher.repository";
import {IApiKeyGenerator} from "../application/services/api-key/api-key-generator";
import {IApiKeyRepository} from "../domain/repositories/api-key.repository";
import {API_KEY_GENERATOR_TOKEN} from "../application/services/api-key/api-key-generator.tokens";
import {API_KEY_REPOSITORY_TOKEN} from "../domain/tokens/api-key.token";
import {FindTenantsUseCase} from "../application/use-cases/find-tenants.use-case";

@Module({
    imports: [PrismaModule],
    providers: [
        {
            provide: TENANT_REPOSITORY_TOKEN,
            useClass: PrismaTenantRepository
        },
        {
            provide: PASSWORD_HASHER_TOKEN,
            useClass: BcryptPasswordHasher,
        },
        {
            provide: CreateTenantUseCase,
            useFactory: (
                tenantRepository: ITenantRepository,
                passwordHasher: IPasswordHasherRepository,
                apiKeyGenerator: IApiKeyGenerator,
                apiKeyRepository: IApiKeyRepository
            ) => new CreateTenantUseCase(tenantRepository, passwordHasher, apiKeyGenerator, apiKeyRepository),
            inject: [TENANT_REPOSITORY_TOKEN, PASSWORD_HASHER_TOKEN, API_KEY_GENERATOR_TOKEN, API_KEY_REPOSITORY_TOKEN],
        },
        {
            provide: FindTenantsUseCase,
            useFactory: (
                tenantRepository: ITenantRepository,
            ) => new FindTenantsUseCase(tenantRepository),
            inject: [TENANT_REPOSITORY_TOKEN]
        }
    ],
    controllers: [TenantController],
})
export class TenantModule {}