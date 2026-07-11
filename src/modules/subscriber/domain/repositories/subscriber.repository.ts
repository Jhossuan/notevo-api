import {Subscriber} from "../entities/subscriber.entity";
import {IPaginationMetadata} from "../../../../shared/interfaces/pagination.interface";

export interface ISubscriberRepository {
    create(subscriber: Subscriber): Promise<Subscriber>;
    findAll(page: number, limit: number): Promise<{ subscribers: Subscriber[], metadata: IPaginationMetadata }>;
    findById(id: string): Promise<Subscriber | null>;
    findByExternalId(tenantId: string, externalId: string): Promise<Subscriber | null>;
    update(subscriber: Subscriber): Promise<Subscriber>;
    remove(id: string): Promise<void>;
}