import {CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException} from "@nestjs/common";
import {IApiKeyRepository} from "../../modules/tenant/domain/repositories/api-key.repository";
import {IApiKeyGenerator} from "../../modules/tenant/application/services/api-key/api-key-generator";
import {API_KEY_GENERATOR_TOKEN} from "../../modules/tenant/application/services/api-key/api-key-generator.tokens";
import {API_KEY_REPOSITORY_TOKEN} from "../../modules/tenant/domain/tokens/api-key.token";

@Injectable()
export class ApiKeyGuard implements CanActivate {

    constructor(
        @Inject(API_KEY_REPOSITORY_TOKEN) private readonly apiKeyRepository: IApiKeyRepository,
        @Inject(API_KEY_GENERATOR_TOKEN) private readonly apiKeyGenerator: IApiKeyGenerator
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const apiKey = request.headers['x-api-key'];
        if(!apiKey) {
            throw new UnauthorizedException("API Key is required to access this resource");
        }

        const hashedApiKey = await this.apiKeyGenerator.hash(apiKey);
        const dbApiKey = await this.apiKeyRepository.findByHashedKey(hashedApiKey);

        if(!dbApiKey) {
            throw new UnauthorizedException("API Key invalid");
        }
        if(dbApiKey.revokedAt){
            throw new UnauthorizedException("API Key revoked");
        }
        await this.apiKeyRepository.updateLastUsed(dbApiKey.id);
        request.tenantId = dbApiKey.tenantId;

        return true;
    }
}