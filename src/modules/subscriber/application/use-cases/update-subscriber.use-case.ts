import {ISubscriberRepository} from "../../domain/repositories/subscriber.repository";

interface IUpdateSubscriberDto {
    externalId?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    metadata?: Record<string, any> | null;
}

export class UpdateSubscriberUseCase {
    constructor(
        private readonly subscriberRepository: ISubscriberRepository,
    ) {}

    async execute(dto: IUpdateSubscriberDto, subscriberId: string, tenantId: string) {
        const existingSubscriber = await this.subscriberRepository.findById(subscriberId, tenantId);
        if(!existingSubscriber) {
            throw new Error(`Subscriber with id ${subscriberId} not found`)
        }

        if(dto.externalId) existingSubscriber.externalId = dto.externalId
        if(dto.firstName) existingSubscriber.firstName = dto.firstName
        if(dto.lastName) existingSubscriber.lastName = dto.lastName
        if(dto.email) existingSubscriber.email = dto.email
        if(dto.phone) existingSubscriber.phone = dto.phone
        if(dto.metadata) existingSubscriber.metadata = dto.metadata

        return await this.subscriberRepository.update(existingSubscriber)
    }
}