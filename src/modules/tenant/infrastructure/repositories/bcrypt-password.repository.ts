import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import {IPasswordHasherRepository} from "../../application/services/password/password-hasher.repository";

@Injectable()
export class BcryptPasswordRepository implements IPasswordHasherRepository {

    async hash(password: string): Promise<string> {
        return bcrypt.hash(password, 12);
    }

    async compare(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

}