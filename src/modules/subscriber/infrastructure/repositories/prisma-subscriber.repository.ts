import {ISubscriberRepository} from "../../domain/repositories/subscriber.repository";
import {PrismaService} from "../../../../shared/infrastructure/persistence/prisma.service";
import {Subscriber} from "../../domain/entities/subscriber.entity";
import {IPaginationMetadata} from "../../../../shared/interfaces/pagination.interface";

export class PrismaSubscriberRepository implements ISubscriberRepository {

    constructor(private readonly prisma: PrismaService) {}

    async create(subscriber: Subscriber): Promise<Subscriber> {
        const newSubscriber = await this.prisma.subscriber.create({
            data: {
                tenantId: subscriber.tenantId,
                externalId: subscriber.externalId,
                firstName: subscriber.firstName,
                lastName: subscriber.lastName,
                email: subscriber.email,
                phone: subscriber.phone,
                metadata: subscriber.metadata,
            }
        });

        return Subscriber.get({
            id: newSubscriber.id,
            tenantId: newSubscriber.tenantId,
            externalId: newSubscriber.externalId,
            firstName: newSubscriber.firstName,
            lastName: newSubscriber.lastName,
            email: newSubscriber.email,
            phone: newSubscriber.phone,
            metadata: newSubscriber.metadata as Record<string, any> | null,
            createdAt: newSubscriber.createdAt,
            updatedAt: newSubscriber.updatedAt,
        })
    }

    async findAll(page: number, limit: number): Promise<{ subscribers: Subscriber[], metadata: IPaginationMetadata }> {
        const totalDocuments = await this.prisma.subscriber.count()

        const subscribers = await this.prisma.subscriber.findMany({
            skip: (page - 1) * limit,
            take: (page - 1) * limit,
        })

        return {
            subscribers: subscribers.map(subscriber => Subscriber.get({
                id: subscriber.id,
                tenantId: subscriber.tenantId,
                externalId: subscriber.externalId,
                firstName: subscriber.firstName,
                lastName: subscriber.lastName,
                email: subscriber.email,
                phone: subscriber.phone,
                metadata: subscriber.metadata as Record<string, any> | null,
                createdAt: subscriber.createdAt,
                updatedAt: subscriber.updatedAt,
            })),
            metadata: {
                currentPage: page,
                lastPage: Math.ceil(totalDocuments / limit),
                totalDocuments: totalDocuments,
            }
        }
    }

    async findById(id: string): Promise<Subscriber> {
        const subscriber = await this.prisma.subscriber.findUnique({
            where: { id: id },
        })

        if(!subscriber) return null;

        return Subscriber.get({
            id: subscriber.id,
            tenantId: subscriber.tenantId,
            externalId: subscriber.externalId,
            firstName: subscriber.firstName,
            lastName: subscriber.lastName,
            email: subscriber.email,
            phone: subscriber.phone,
            metadata: subscriber.metadata as Record<string, any> | null,
            createdAt: subscriber.createdAt,
            updatedAt: subscriber.updatedAt,
        })
    }

    async findByExternalId(tenantId: string, externalId: string): Promise<Subscriber> {
        const subscriber = await this.prisma.subscriber.findUnique({
            where: {
                tenantId_externalId:{
                    tenantId,
                    externalId
                }
            },
        })

        if(!subscriber) return null;

        return Subscriber.get({
            id: subscriber.id,
            tenantId: subscriber.tenantId,
            externalId: subscriber.externalId,
            firstName: subscriber.firstName,
            lastName: subscriber.lastName,
            email: subscriber.email,
            phone: subscriber.phone,
            metadata: subscriber.metadata as Record<string, any> | null,
            createdAt: subscriber.createdAt,
            updatedAt: subscriber.updatedAt,
        })
    }

    async update(subscriber: Subscriber): Promise<Subscriber>{
        const subscriberUpdated = await this.prisma.subscriber.update({
            where: { id: subscriber.id },
            data: {
                firstName: subscriber.firstName,
                lastName: subscriber.lastName,
                email: subscriber.email,
                phone: subscriber.phone,
                metadata: subscriber.metadata,
            }
        })

        return Subscriber.get({
            id: subscriberUpdated.id,
            tenantId: subscriberUpdated.tenantId,
            externalId: subscriberUpdated.externalId,
            firstName: subscriberUpdated.firstName,
            lastName: subscriberUpdated.lastName,
            email: subscriberUpdated.email,
            phone: subscriberUpdated.phone,
            metadata: subscriberUpdated.metadata as Record<string, any> | null,
            createdAt: subscriberUpdated.createdAt,
            updatedAt: subscriberUpdated.updatedAt,
        })
    }

    async remove(id: string): Promise<void> {
        await this.prisma.subscriber.update({
            where: { id: id },
            data: {
                isActive: false,
            }
        })
    }

}