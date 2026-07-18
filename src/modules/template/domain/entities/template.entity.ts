import {BaseEntity} from "../../../../shared/domain/base.entity";
import {v4 as uuidv4} from "uuid"

interface ICreateTemplateProps {
    tenantId: string,
    name: string
    channel: ChannelEnum
    subject?: string | null
    body: string
    variables: string[]
    active?: boolean
}

interface IGetTemplateProps extends ICreateTemplateProps {
    id: string
    createdAt: Date
    updatedAt: Date
}

export enum ChannelEnum {
    EMAIL = "EMAIL",
    WEBHOOK = "WEBHOOK",
    IN_APP = "IN_APP",
}

export class Template extends BaseEntity {
    private constructor(
        id: string,
        public tenantId: string,
        public name: string,
        public channel: ChannelEnum,
        public subject: string | null,
        public body: string,
        public variables: string[],
        public active: boolean = true,
        createdAt: Date,
        updatedAt: Date,
    ) {
        super(id, createdAt, updatedAt)
    }

    public static create(props: ICreateTemplateProps){
        return new Template(
            uuidv4(),
            props.tenantId,
            props.name,
            props.channel,
            props.subject,
            props.body,
            props.variables,
            props.active,
            new Date(),
            new Date(),
        )
    }

    public static get(props: IGetTemplateProps){
        return new Template(
            props.id,
            props.tenantId,
            props.name,
            props.channel,
            props.subject,
            props.body,
            props.variables,
            props.active,
            props.createdAt,
            props.updatedAt
        )
    }

}