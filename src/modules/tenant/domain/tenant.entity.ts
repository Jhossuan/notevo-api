import {BaseEntity} from "../../../shared/domain/base.entity";
import {v4 as uuidv4} from "uuid"

interface ICreateTenantProps {
    name: string
    email: string
    password: string
    planId: string
}

interface IGetTenantProps extends ICreateTenantProps {
    id: string
    isActive: boolean
    createdAt: Date
    updatedAt: Date
}

export class Tenant extends BaseEntity {
    private constructor(
        id: string,
        public name: string,
        public email: string,
        public password: string,
        public isActive: boolean,
        public planId: string,
        createdAt: Date,
        updatedAt: Date,
    ) {
        super(id, createdAt, updatedAt)
    }

    public static create(props: ICreateTenantProps){
        return new Tenant(
            uuidv4(),
            props.name,
            props.email,
            props.password,
            true,
            props.planId,
            new Date(),
            new Date(),
        )
    }

    public static get(props: IGetTenantProps){
        return new Tenant(
            props.id,
            props.name,
            props.email,
            props.password,
            props.isActive,
            props.planId,
            props.createdAt,
            props.updatedAt,
        )
    }

}