import {ApiKey} from "../entities/api-key.entity";
import {IPaginationMetadata} from "../../../../shared/interfaces/pagination.interface";

export interface IApiKeyRepository {
    create(apiKey: ApiKey, tenantId: string): Promise<ApiKey>;
    findByHashedKey(hashedKey: string): Promise<ApiKey | null>;
    findAllByTenantId(tenantId: string, page: number, limit: number): Promise<{ hashedKeys: ApiKey[], metadata: IPaginationMetadata }>;
    revoke(id: string): Promise<void>;
}