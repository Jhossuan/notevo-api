import {ITenantRepository} from "../../domain/repositories/tenant.repository";
import {PrismaService} from "../../../../shared/infrastructure/persistence/prisma.service";
import {Tenant} from "../../domain/entities/tenant.entity";
import {Injectable} from "@nestjs/common";
import {IPaginationMetadata} from "../../../../shared/interfaces/pagination.interface";

@Injectable()
export class PrismaTenantRepository implements ITenantRepository {

    constructor(private readonly prisma: PrismaService) {}

    async create(tenant: Tenant):Promise<Tenant> {
        const newTenant = await this.prisma.tenant.create({
            data: {
                name: tenant.name,
                email: tenant.email,
                password: tenant.password,
                planId: tenant.planId
            }
        })

        return Tenant.get({
            id: newTenant.id,
            name: newTenant.name,
            email: newTenant.email,
            password: newTenant.password,
            isActive: newTenant.isActive,
            planId: newTenant.planId,
            createdAt: newTenant.createdAt,
            updatedAt: newTenant.updatedAt
        })
    }

    async update(tenant: Tenant): Promise<Tenant> {
        const tenantUpdated = await this.prisma.tenant.update({
            where: { id: tenant.id, isActive: true },
            data: {
                name: tenant.name,
                email: tenant.email,
                planId: tenant.planId,
            }
        })

        return Tenant.get({
            id: tenantUpdated.id,
            name: tenantUpdated.name,
            email: tenantUpdated.email,
            password: tenantUpdated.password,
            isActive: tenantUpdated.isActive,
            planId: tenantUpdated.planId,
            createdAt: tenantUpdated.createdAt,
            updatedAt: tenantUpdated.updatedAt
        })
    }

    async findById(id: string): Promise<Tenant | null> {
        const tenant = await this.prisma.tenant.findUnique({
            where: { id }
        });

        if (!tenant) return null;

        return Tenant.get({
            id: tenant.id,
            name: tenant.name,
            email: tenant.email,
            password: tenant.password,
            isActive: tenant.isActive,
            planId: tenant.planId,
            createdAt: tenant.createdAt,
            updatedAt: tenant.updatedAt
        })
    }

    async findByEmail(email: string): Promise<Tenant | null> {
        const tenant = await this.prisma.tenant.findUnique({
            where: { email }
        });

        if(!tenant) return null;

        return Tenant.get({
            id: tenant.id,
            name: tenant.name,
            email: tenant.email,
            password: tenant.password,
            isActive: tenant.isActive,
            planId: tenant.planId,
            createdAt: tenant.createdAt,
            updatedAt: tenant.updatedAt
        })
    }

    async findAll(page: number, limit: number): Promise<{ tenants: Tenant[], metadata: IPaginationMetadata }> {
        const totalDocuments = await this.prisma.tenant.count({
            where: { isActive: true }
        })

        const tenants = await this.prisma.tenant.findMany({
            where: { isActive: true },
            skip: (page - 1) * limit,
            take: limit,
        })

        return {
            tenants: tenants.map(tenant => Tenant.get({
                id: tenant.id,
                name: tenant.name,
                email: tenant.email,
                password: tenant.password,
                isActive: tenant.isActive,
                planId: tenant.planId,
                createdAt: tenant.createdAt,
                updatedAt: tenant.updatedAt
            })),
            metadata: {
                currentPage: page,
                lastPage: Math.ceil(totalDocuments / limit),
                totalDocuments: totalDocuments,
            }
        }
    }

    async deactivate(id: string): Promise<void> {
        await this.prisma.tenant.update({
            where: { id },
            data: {
                isActive: false,
            }
        })
    }

    async activate(id: string): Promise<void> {
        await this.prisma.tenant.update({
            where: { id },
            data: {
                isActive: true,
            }
        })
    }

}