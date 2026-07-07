import {Global, Module} from "@nestjs/common";
import {API_KEY_GENERATOR_TOKEN} from "../../modules/tenant/application/services/api-key/api-key-generator.tokens";
import {CryptoApiKeyGenerator} from "../../modules/tenant/infrastructure/services/crypto-api-key-generator";
import {API_KEY_REPOSITORY_TOKEN} from "../../modules/tenant/domain/tokens/api-key.token";
import {PrismaApiKeyRepository} from "../../modules/tenant/infrastructure/repositories/prisma-api-key.repository";
import {ApiKeyGuard} from "../guards/api-key.guard";

@Global()
@Module({
    providers: [
        {
            provide: API_KEY_GENERATOR_TOKEN,
            useClass: CryptoApiKeyGenerator
        },
        {
            provide: API_KEY_REPOSITORY_TOKEN,
            useClass: PrismaApiKeyRepository
        },
        ApiKeyGuard
    ],
    exports: [
        API_KEY_REPOSITORY_TOKEN,
        API_KEY_GENERATOR_TOKEN,
        ApiKeyGuard
    ]
})
export class AuthModule {}