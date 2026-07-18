import {Template} from "../entities/template.entity";
import {IPaginationMetadata} from "../../../../shared/interfaces/pagination.interface";

export interface ITemplateRepository {
    create(template: Template): Promise<Template>;
    update(template: Template): Promise<Template>;
    findAll(tenantId: string, page: number, limit: number): Promise<{ templates: Template[], metadata: IPaginationMetadata }>;
    findById(id: string, tenantId: string): Promise<Template | null>;
    delete(id: string): Promise<void>;
}


