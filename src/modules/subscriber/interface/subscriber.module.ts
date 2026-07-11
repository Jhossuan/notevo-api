import {Module} from "@nestjs/common";
import {PrismaModule} from "../../../shared/infrastructure/persistence/prisma.module";
import {PrismaSubscriberRepository} from "../infrastructure/repositories/prisma-subscriber.repository";
import {SUBSCRIBER_REPOSITORY_TOKEN} from "../domain/tokens/subscriber.tokens";
import {SubscriberController} from "./subscriber.controller";
import {CreateSubscriberUseCase} from "../application/use-cases/create-subscriber.use-case";
import {ISubscriberRepository} from "../domain/repositories/subscriber.repository";

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
        }
    ],
    controllers: [SubscriberController],
})
export class SubscriberModule {}