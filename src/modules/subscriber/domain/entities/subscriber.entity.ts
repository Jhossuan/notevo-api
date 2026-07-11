import {BaseEntity} from "../../../../shared/domain/base.entity";
import {v4 as uuidv4} from "uuid"

interface ICreateSubscriberProps {
    tenantId: string
    externalId: string
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    phone?: string | null
    metadata?: Record<string, any> | null
}

interface IGetSubscriberProps extends ICreateSubscriberProps {
    id: string
    createdAt: Date
    updatedAt: Date
}

export class Subscriber extends BaseEntity {
    private constructor(
        id: string,
        public tenantId: string,
        public externalId: string,
        public firstName: string | null,
        public lastName: string | null,
        public email: string | null,
        public phone: string | null,
        public metadata: Record<string, any> | null,
        createdAt: Date,
        updatedAt: Date,
    ) {
        super(id, createdAt, updatedAt);
    }

    public static create(props: ICreateSubscriberProps){
        return new Subscriber(
            uuidv4(),
            props.tenantId,
            props.externalId,
            props.firstName,
            props.lastName,
            props.email,
            props.phone,
            props.metadata,
            new Date(),
            new Date(),
        )
    }

    public static get(props: IGetSubscriberProps){
        return new Subscriber(
            props.id,
            props.tenantId,
            props.externalId,
            props.firstName,
            props.lastName,
            props.email,
            props.phone,
            props.metadata,
            props.createdAt,
            props.updatedAt,
        )
    }
}