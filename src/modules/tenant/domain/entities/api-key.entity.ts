import {BaseEntity} from "../../../../shared/domain/base.entity";
import {v4 as uuidv4} from "uuid"

export enum ApiKeyScope {
    FULL_ACCESS = "FULL_ACCESS",
    READ_ONLY = "READ_ONLY",
}

interface ICreateApiKeyProps {
    hashedKey: string;
    prefix: string;
    name: string;
    tenantId: string;
}

interface IGetApiKeyProps extends ICreateApiKeyProps {
    id: string
    scope: ApiKeyScope;
    lastUsedAt?: Date | null;
    revokedAt?: Date | null;
    createdAt: Date;
}

export class ApiKey extends BaseEntity {

    private constructor(
        id: string,
        public hashedKey: string,
        public prefix: string,
        public name: string,
        public scope: ApiKeyScope,
        public tenantId: string,
        public lastUsedAt: Date | null,
        public revokedAt: Date | null,
        createdAt: Date,
    ) {
        super(id, createdAt, createdAt);
    }

    public static create(props: ICreateApiKeyProps){
        return new ApiKey(
            uuidv4(),
            props.hashedKey,
            props.prefix,
            props.name,
            ApiKeyScope.FULL_ACCESS,
            props.tenantId,
            null,
            null,
            new Date()
        )
    }

    public static get(props: IGetApiKeyProps){
        return new ApiKey(
            props.id,
            props.hashedKey,
            props.prefix,
            props.name,
            props.scope,
            props.tenantId,
            props.lastUsedAt,
            props.revokedAt,
            props.createdAt
        )
    }

}