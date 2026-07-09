import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {envValidation} from "../../config/env.validation";

@Injectable()
export class AdminGuard implements CanActivate {

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const apiKey = request.headers['x-admin-key'];
        const envKey = envValidation.adminSecret

        if(!apiKey){
            throw new UnauthorizedException("API Key is required to access this resource");
        }

        if(apiKey !== envKey){
            throw new UnauthorizedException("API Key invalid");
        }
        return true;
    }

}