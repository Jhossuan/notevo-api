import {ISubscriberRepository} from "../../domain/repositories/subscriber.repository";
import {IPagination} from "../../../../shared/interfaces/pagination.interface";

export class FindSubscribersUseCase {
    constructor(
        private readonly subscriberRepository: ISubscriberRepository,
    ) {}

    async execute(dto: IPagination, tenantId: string) {
        const { page, limit } = dto
        return await this.subscriberRepository.findAll(tenantId, page, limit);
    }

}