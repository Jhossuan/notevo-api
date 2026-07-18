import {Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, UseGuards} from "@nestjs/common";
import {ApiOperation} from "@nestjs/swagger";
import {Template} from "../domain/entities/template.entity";
import {TenantId} from "../../../shared/decorators/tenant-id.decorator";
import {CreateTemplateDto} from "./dto/create-template.dto";
import {CreateTemplateUseCase} from "../application/use-cases/create-template.use-case";
import {IControllerResponse} from "../../../shared/interfaces/response.interface";
import {ApiKeyGuard} from "../../../shared/guards/api-key.guard";
import {FindTemplatesUseCase} from "../application/use-cases/find-templates.use-case";
import {PaginationDto} from "../../../shared/dto/pagination.dto";
import {IPagination, IPaginationMetadata} from "../../../shared/interfaces/pagination.interface";
import {UpdateTemplateUseCase} from "../application/use-cases/update-template.use-case";
import {UpdateTemplateDto} from "./dto/update-template.dto";
import {FindTemplateUseCase} from "../application/use-cases/find-template.use-case";
import {DeleteTemplateUseCase} from "../application/use-cases/delete-template.use-case";

@Controller('template')
export class TemplateController {
    constructor(
        private readonly createTemplateUseCase: CreateTemplateUseCase,
        private readonly findTemplatesUseCase: FindTemplatesUseCase,
        private readonly updateTemplatesUseCase: UpdateTemplateUseCase,
        private readonly findTemplateUseCase: FindTemplateUseCase,
        private readonly deleteTemplateUseCase: DeleteTemplateUseCase,
    ) {}

    @UseGuards(ApiKeyGuard)
    @Post()
    @ApiOperation({ summary: "Create a template" })
    async create(
        @Body() createTemplateDto: CreateTemplateDto,
        @TenantId() tenantId: string
    ): Promise<IControllerResponse<Template>> {
        const template = await this.createTemplateUseCase.execute(createTemplateDto, tenantId);
        return {
            data: template,
            status: HttpStatus.CREATED,
            message: "Template created successfully",
            success: true,
        }
    }

    @UseGuards(ApiKeyGuard)
    @Get()
    @ApiOperation({ summary: "Gets a list of template" })
    async findAll(
        @TenantId() tenantId: string,
        @Query() paginationDto: PaginationDto,
    ): Promise<IControllerResponse<{ templates: Template[], metadata: IPaginationMetadata }>> {
        const template = await this.findTemplatesUseCase.execute(paginationDto as IPagination, tenantId);
        return {
            data: template,
            status: HttpStatus.OK,
            message: "Template list successfully",
            success: true,
        }
    }

    @UseGuards(ApiKeyGuard)
    @Patch(':templateId')
    @ApiOperation({ summary: "Update a template" })
    async update(
        @TenantId() tenantId: string,
        @Param('templateId') templateId: string,
        @Body() updateTemplateDto: UpdateTemplateDto
    ): Promise<IControllerResponse<Template>> {
        const template = await this.updateTemplatesUseCase.execute(updateTemplateDto, tenantId, templateId);
        return {
            data: template,
            status: HttpStatus.OK,
            message: "Template updated successfully",
            success: true,
        }
    }

    @UseGuards(ApiKeyGuard)
    @Get(':templateId')
    @ApiOperation({ summary: "Find a template" })
    async findById(
        @TenantId() tenantId: string,
        @Param('templateId') templateId: string,
    ): Promise<IControllerResponse<Template | null>> {
        const template = await this.findTemplateUseCase.execute(templateId, tenantId);
        return {
            data: template,
            status: HttpStatus.OK,
            message: "Template found",
            success: true,
        }
    }

    @UseGuards(ApiKeyGuard)
    @Delete(':templateId')
    @ApiOperation({ summary: "Delete a template" })
    async delete(
        @TenantId() tenantId: string,
        @Param('templateId') templateId: string,
    ): Promise<IControllerResponse<any>> {
        await this.deleteTemplateUseCase.execute(templateId, tenantId);
        return {
            data: "Template deleted successfully",
            status: HttpStatus.OK,
            message: "Template deleted successfully",
            success: true,
        }
    }

}