import {ISubscriberRepository} from "../../domain/repositories/subscriber.repository";
import {Subscriber} from "../../domain/entities/subscriber.entity";

interface ICreateSubscriberDto {
    externalId: string;
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    phone?: string | null
    metadata?: Record<string, any> | null
}

export class CreateSubscriberUseCase {
    constructor(
        public readonly subscriberRepository: ISubscriberRepository,
    ) {}

    async execute(dto: ICreateSubscriberDto, tenantId: string ){
        const { externalId, firstName, lastName, phone, metadata, email } = dto;

        const existing = await this.subscriberRepository.findByExternalId(tenantId, externalId);
        if(existing) throw new Error('externalId already exists')

        const subscriber = Subscriber.create({
            externalId,
            tenantId,
            firstName,
            lastName,
            email,
            phone,
            metadata,
        })

        return this.subscriberRepository.create(subscriber)
    }

}