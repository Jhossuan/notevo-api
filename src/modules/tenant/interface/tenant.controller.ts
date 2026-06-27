import {Body, Controller, HttpStatus, Post} from "@nestjs/common";
import {CreateTenantUseCase} from "../application/use-cases/create-tenant.use-case";
import {CreateTenantDto} from "./dto/create-tenant.dto";
import {IControllerResponse} from "../../../shared/interfaces/response.interface";
import {Tenant} from "../domain/tenant.entity";

@Controller("tenant")
export class TenantController {

    constructor(
        private readonly createTenantUseCase: CreateTenantUseCase,
    ) {}

    @Post()
    async createTenant(@Body() createTenantDto: CreateTenantDto): Promise<IControllerResponse<Tenant>>{
        const tenant = await this.createTenantUseCase.execute(createTenantDto);
        return {
            data: tenant,
            status: HttpStatus.CREATED,
            message: 'Tenant created successfully',
            success: true,
        }
    }

}