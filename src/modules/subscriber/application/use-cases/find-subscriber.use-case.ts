import {ISubscriberRepository} from "../../domain/repositories/subscriber.repository";

export class FindSubscriberUseCase {
    constructor(
        private readonly subscriberRepository: ISubscriberRepository,
    ) {}

    async execute(subscriberId: string, tenantId: string) {
        const subscriber = await this.subscriberRepository.findById(subscriberId, tenantId);
        if(!subscriber) {
            throw new Error("Subscriber not found");
        }
        return subscriber;
    }

}