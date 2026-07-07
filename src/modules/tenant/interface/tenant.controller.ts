import {Body, Controller, Get, HttpStatus, Param, Post, UseGuards} from "@nestjs/common";
import {CreateTenantUseCase} from "../application/use-cases/create-tenant.use-case";
import {CreateTenantDto} from "./dto/create-tenant.dto";
import {IControllerResponse} from "../../../shared/interfaces/response.interface";
import {Tenant} from "../domain/entities/tenant.entity";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ApiKeyGuard} from "../../../shared/guards/api-key.guard";

@ApiTags('Tenants')
@Controller("tenant")
export class TenantController {

    constructor(
        private readonly createTenantUseCase: CreateTenantUseCase,
    ) {}

    @Post()
    @ApiOperation({ summary: "Create a new tenant" })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Tenant created successfully' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Validation error' })
    @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Email already exists' })
    async createTenant(@Body() createTenantDto: CreateTenantDto): Promise<IControllerResponse<{ tenant: Tenant, apiKey: string }>>{
        const tenant = await this.createTenantUseCase.execute(createTenantDto);
        return {
            data: tenant,
            status: HttpStatus.CREATED,
            message: 'Tenant created successfully',
            success: true,
        }
    }

    @UseGuards(ApiKeyGuard)
    @Get()
    async getTenant(@Param("tenant") tenant: Tenant): Promise<boolean> {
        return true;
    }

}