import {Tenant} from "../entities/tenant.entity";
import {IPaginationMetadata} from "../../../../shared/interfaces/pagination.interface";

export interface ITenantRepository {
    create(tenant: Tenant): Promise<Tenant>;
    update(tenant: Tenant): Promise<Tenant>;
    findById(id: string): Promise<Tenant | null>;
    findByEmail(email: string): Promise<Tenant | null>;
    findAll(page: number, limit: number): Promise<{ tenants: Tenant[], metadata: IPaginationMetadata }>;
    deactivate(id: string): Promise<void>;
    activate(id: string): Promise<void>;
}