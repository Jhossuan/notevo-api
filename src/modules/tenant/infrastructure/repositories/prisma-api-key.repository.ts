import {IApiKeyRepository} from "../../domain/repositories/api-key.repository";
import {ApiKey, ApiKeyScope as EnumApiKeyScope} from "../../domain/entities/api-key.entity";
import {PrismaService} from "../../../../shared/infrastructure/persistence/prisma.service";
import {ApiKeyScope} from "@prisma/client";
import {Injectable} from "@nestjs/common";
import {IPaginationMetadata} from "../../../../shared/interfaces/pagination.interface";

@Injectable()
export class PrismaApiKeyRepository implements IApiKeyRepository {

    constructor(private readonly prisma: PrismaService) {}

    async create(apiKey: ApiKey, tenantId: string): Promise<ApiKey> {
        const newApiKey = await this.prisma.apiKey.create({
            data: {
                hashedKey: apiKey.hashedKey,
                prefix: apiKey.prefix,
                name: apiKey.name,
                scope: ApiKeyScope[apiKey.scope],
                tenantId: tenantId
            }
        })

        return ApiKey.get({
            id: newApiKey.id,
            hashedKey: newApiKey.hashedKey,
            prefix: newApiKey.prefix,
            name: newApiKey.name,
            scope: EnumApiKeyScope[newApiKey.scope],
            lastUsedAt: newApiKey.lastUsedAt,
            revokedAt: newApiKey.revokedAt,
            createdAt: newApiKey.createdAt
        })
    }

    async findByHashedKey(hashedKey: string): Promise<ApiKey | null> {
        const key = await this.prisma.apiKey.findUnique({
            where: { hashedKey }
        });

        if(!key) return null;

        return ApiKey.get({
            id: key.id,
            hashedKey: key.hashedKey,
            prefix: key.prefix,
            name: key.name,
            scope: EnumApiKeyScope[key.scope],
            lastUsedAt: key.lastUsedAt,
            revokedAt: key.revokedAt,
            createdAt: key.createdAt
        })
    }

    async findAllByTenantId(tenantId: string, page: number, limit: number): Promise<{ hashedKeys: ApiKey[], metadata: IPaginationMetadata }> {
        const totalDocuments = await this.prisma.apiKey.count({
            where: { tenantId }
        })

        const hashedKeys = await this.prisma.apiKey.findMany({
            where: { tenantId },
            skip: (page - 1) * limit,
            take: limit,
        })

        return {
            hashedKeys: hashedKeys.map(key => ApiKey.get({
                id: key.id,
                hashedKey: key.hashedKey,
                prefix: key.prefix,
                name: key.name,
                scope: EnumApiKeyScope[key.scope],
                lastUsedAt: key.lastUsedAt,
                revokedAt: key.revokedAt,
                createdAt: key.createdAt
            })),
            metadata: {
                currentPage: page,
                lastPage: Math.ceil(totalDocuments / limit),
                totalDocuments: totalDocuments
            }
        }
    }

    async revoke(id: string): Promise<void> {
        await this.prisma.apiKey.update({
            where: { id },
            data: {
                revokedAt: new Date()
            }
        })
    }

}