import {Module} from "@nestjs/common";
import {TenantController} from "./tenant.controller";
import {PrismaModule} from "../../../shared/infrastructure/persistence/prisma.module";
import {TENANT_REPOSITORY_TOKEN} from "../domain/tenant.tokens";
import {PrismaTenantRepository} from "../infrastructure/repositories/prisma-tenant.repository";
import {PASSWORD_HASHER_TOKEN} from "../application/services/password/password-hasher.tokens";
import {BcryptPasswordHasher} from "../application/services/password/bcrypt-password-hasher";
import {CreateTenantUseCase} from "../application/use-cases/create-tenant.use-case";
import {ITenantRepository} from "../domain/tenant.repository";
import {IPasswordHasherRepository} from "../application/services/password/password-hasher.repository";

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
                passwordHasher: IPasswordHasherRepository
            ) => new CreateTenantUseCase(tenantRepository, passwordHasher),
            inject: [TENANT_REPOSITORY_TOKEN, PASSWORD_HASHER_TOKEN],
        }
    ],
    controllers: [TenantController],
})
export class TenantModule {}