import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import {IPasswordHasherRepository} from "./password-hasher.repository";

@Injectable()
export class BcryptPasswordHasher implements IPasswordHasherRepository {

    async hash(password: string): Promise<string> {
        return bcrypt.hash(password, 12);
    }

    async compare(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

}