import {Body, Controller, Get, HttpStatus, Post, Query, UseGuards} from "@nestjs/common";
import {CreateTenantUseCase} from "../application/use-cases/create-tenant.use-case";
import {CreateTenantDto} from "./dto/create-tenant.dto";
import {IControllerResponse} from "../../../shared/interfaces/response.interface";
import {Tenant} from "../domain/entities/tenant.entity";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ApiKeyGuard} from "../../../shared/guards/api-key.guard";
import {FindTenantsUseCase} from "../application/use-cases/find-tenants.use-case";
import {PaginationDto} from "../../../shared/dto/pagination.dto";
import {IPagination, IPaginationMetadata} from "../../../shared/interfaces/pagination.interface";

@ApiTags('Tenants')
@Controller("tenant")
export class TenantController {

    constructor(
        private readonly createTenantUseCase: CreateTenantUseCase,
        private readonly findTenantsUseCase: FindTenantsUseCase,
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
    async getTenant(@Query() paginationDto: PaginationDto): Promise<IControllerResponse<{ tenants: Tenant[], metadata: IPaginationMetadata }>> {
        const tenants = await this.findTenantsUseCase.execute(paginationDto as IPagination);
        return {
            data: tenants,
            status: HttpStatus.OK,
            message: 'Tenant list successfully',
            success: true,
        }
    }

}