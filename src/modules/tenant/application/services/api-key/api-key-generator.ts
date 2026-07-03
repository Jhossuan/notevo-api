export interface IGeneratedApiKey {
    plain: string;
    hashed: string;
    prefix: string;
}

export interface IApiKeyGenerator {
    generate(): Promise<IGeneratedApiKey>;
    compare(key: string, hash: string): Promise<boolean>;
    hash(key: string): Promise<string>;
}