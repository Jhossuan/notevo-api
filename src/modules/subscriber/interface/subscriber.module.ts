import {Module} from "@nestjs/common";
import {PrismaModule} from "../../../shared/infrastructure/persistence/prisma.module";
import {PrismaSubscriberRepository} from "../infrastructure/repositories/prisma-subscriber.repository";
import {SUBSCRIBER_REPOSITORY_TOKEN} from "../domain/tokens/subscriber.tokens";
import {SubscriberController} from "./subscriber.controller";
import {CreateSubscriberUseCase} from "../application/use-cases/create-subscriber.use-case";
import {ISubscriberRepository} from "../domain/repositories/subscriber.repository";
import {FindSubscribersUseCase} from "../application/use-cases/find-subscribers.use-case";
import {FindSubscriberUseCase} from "../application/use-cases/find-subscriber.use-case";
import {RemoveSubscriberUseCase} from "../application/use-cases/remove-subscriber.use-case";
import {UpdateSubscriberUseCase} from "../application/use-cases/update-subscriber.use-case";

@Module({
    imports: [PrismaModule],
    providers: [
        {
            provide: SUBSCRIBER_REPOSITORY_TOKEN,
            useClass: PrismaSubscriberRepository
        },
        {
            provide: CreateSubscriberUseCase,
            useFactory: (
                subscriberRepository: ISubscriberRepository
            ) => new CreateSubscriberUseCase(subscriberRepository),
            inject: [SUBSCRIBER_REPOSITORY_TOKEN]
        },
        {
            provide: FindSubscribersUseCase,
            useFactory: (
                subscriberRepository: ISubscriberRepository
            ) => new FindSubscribersUseCase(subscriberRepository),
            inject: [SUBSCRIBER_REPOSITORY_TOKEN]
        },
        {
            provide: FindSubscriberUseCase,
            useFactory: (
                subscriberRepository: ISubscriberRepository
            ) => new FindSubscriberUseCase(subscriberRepository),
            inject: [SUBSCRIBER_REPOSITORY_TOKEN]
        },
        {
            provide: UpdateSubscriberUseCase,
            useFactory: (
                subscriberRepository: ISubscriberRepository
            ) => new UpdateSubscriberUseCase(subscriberRepository),
            inject: [SUBSCRIBER_REPOSITORY_TOKEN]
        },
        {
            provide: RemoveSubscriberUseCase,
            useFactory: (
                subscriberRepository: ISubscriberRepository
            ) => new RemoveSubscriberUseCase(subscriberRepository),
            inject: [SUBSCRIBER_REPOSITORY_TOKEN]
        },
    ],
    controllers: [SubscriberController],
})
export class SubscriberModule {}