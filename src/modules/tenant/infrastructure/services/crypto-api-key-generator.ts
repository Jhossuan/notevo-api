import {Injectable} from "@nestjs/common";
import {IApiKeyGenerator, IGeneratedApiKey} from "../../application/services/api-key/api-key-generator";
import { randomBytes } from "node:crypto"
import * as bcrypt from "bcrypt";

@Injectable()
export class CryptoApiKeyGenerator implements IApiKeyGenerator {

    async generate(): Promise<IGeneratedApiKey> {
        const apiKey = `ntv_live_${randomBytes(32).toString("hex")}`
        const prefix = apiKey.substring(0, 16);
        const hashed = await this.hash(apiKey);

        return {
            hashed: hashed,
            plain: apiKey,
            prefix: prefix
        }
    }

    async compare(key: string, hash: string): Promise<boolean> {
        return bcrypt.compare(key, hash);
    }

    async hash(key: string): Promise<string> {
        return bcrypt.hash(key, 10)
    }

}