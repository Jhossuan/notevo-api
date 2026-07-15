import {ISubscriberRepository} from "../../domain/repositories/subscriber.repository";

export class RemoveSubscriberUseCase {
    constructor(
        private readonly subscriberRepository: ISubscriberRepository,
    ) {}

    async execute(tenantId: string, subscriberId: string){
        const existingSubscriber = await this.subscriberRepository.findById(subscriberId, tenantId)
        if(!existingSubscriber) {
            throw new Error(`Subscriber with id ${tenantId} not found`);
        }

        return await this.subscriberRepository.remove(existingSubscriber.id);
    }
}