import {Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, UseGuards} from "@nestjs/common";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Tenant} from "../domain/entities/tenant.entity";
import {IControllerResponse} from "../../../shared/interfaces/response.interface";
import {ApiKeyGuard} from "../../../shared/guards/api-key.guard";
import {AdminGuard} from "../../../shared/guards/admin.guard";
import {IPagination, IPaginationMetadata} from "../../../shared/interfaces/pagination.interface";
import {TenantId} from "../../../shared/decorators/tenant-id.decorator";
import {CreateTenantUseCase} from "../application/use-cases/create-tenant.use-case";
import {FindTenantsUseCase} from "../application/use-cases/find-tenants.use-case";
import {FindTenantUseCase} from "../application/use-cases/find-tenant.use-case";
import {UpdateTenantUseCase} from "../application/use-cases/update-tenant.use-case";
import {DeleteTenantUseCase} from "../application/use-cases/delete-tenant.use-case";
import {PaginationDto} from "../../../shared/dto/pagination.dto";
import {CreateTenantDto} from "./dto/create-tenant.dto";
import {UpdateTenantDto} from "./dto/update-tenant.dto";

@ApiTags('Tenants')
@Controller("tenant")
export class TenantController {

    constructor(
        private readonly createTenantUseCase: CreateTenantUseCase,
        private readonly findTenantsUseCase: FindTenantsUseCase,
        private readonly findTenantUseCase: FindTenantUseCase,
        private readonly updateTenantUseCase: UpdateTenantUseCase,
        private readonly deleteTenantUseCase: DeleteTenantUseCase,
    ) {}

    @Post()
    @ApiOperation({ summary: "Create a new tenant" })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Tenant created successfully' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Validation error' })
    @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Email already exists' })
    async create(@Body() createTenantDto: CreateTenantDto): Promise<IControllerResponse<{ tenant: Tenant, apiKey: string }>>{
        const tenant = await this.createTenantUseCase.execute(createTenantDto);
        return {
            data: tenant,
            status: HttpStatus.CREATED,
            message: 'Tenant created successfully',
            success: true,
        }
    }

    @UseGuards(AdminGuard)
    @Get()
    async findAll(
        @Query() paginationDto: PaginationDto,
    ): Promise<IControllerResponse<{ tenants: Tenant[], metadata: IPaginationMetadata }>> {
        const tenants = await this.findTenantsUseCase.execute(paginationDto as IPagination);
        return {
            data: tenants,
            status: HttpStatus.OK,
            message: 'Tenant list successfully',
            success: true,
        }
    }

    @UseGuards(ApiKeyGuard)
    @Get(':tenantId')
    async findById(
        @Param('tenantId') paramTenantId: string,
        @TenantId() reqTenantId: string
    ): Promise<IControllerResponse<Tenant>>{
        const tenant = await this.findTenantUseCase.execute(paramTenantId, reqTenantId);
        return {
            data: tenant,
            status: HttpStatus.OK,
            message: 'Tenant found',
            success: true,
        }
    }

    @UseGuards(ApiKeyGuard)
    @Patch(':tenantId')
    async update(
        @Param('tenantId') paramTenantId: string,
        @TenantId() reqTenantId: string,
        @Body() updateTenantDto: UpdateTenantDto
    ): Promise<IControllerResponse<Tenant>>{
        const tenant = await this.updateTenantUseCase.execute(updateTenantDto, paramTenantId, reqTenantId);
        return {
            data: tenant,
            status: HttpStatus.OK,
            message: 'Tenant updated successfully',
            success: true,
        }
    }

    @UseGuards(ApiKeyGuard)
    @Delete(':tenantId')
    async delete(
        @Param('tenantId') paramTenantId: string,
        @TenantId() reqTenantId: string,
    ): Promise<IControllerResponse<any>>{
        await this.deleteTenantUseCase.execute(paramTenantId, reqTenantId);
        return {
            data: "Tenant deleted",
            status: HttpStatus.OK,
            message: 'Tenant deleted correctly, you can activate it whenever you want',
            success: true,
        }
    }


}