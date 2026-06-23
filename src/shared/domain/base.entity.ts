export abstract class BaseEntity {
    protected constructor(
        public id: string,
        public createdAt: Date,
        public updatedAt: Date,
    ) {}
}