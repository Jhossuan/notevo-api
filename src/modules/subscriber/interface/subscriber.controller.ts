import {Controller, Post, Body, HttpStatus, Get, Query, UseGuards, Param, Patch, Delete} from "@nestjs/common";
import {CreateSubscriberUseCase} from "../application/use-cases/create-subscriber.use-case";
import {ApiOperation} from "@nestjs/swagger";
import {TenantId} from "../../../shared/decorators/tenant-id.decorator";
import {CreateSubscriberDto} from "./dto/create-subscriber.dto";
import {IControllerResponse} from "../../../shared/interfaces/response.interface";
import {Subscriber} from "../domain/entities/subscriber.entity";
import {IPagination, IPaginationMetadata} from "../../../shared/interfaces/pagination.interface";
import {PaginationDto} from "../../../shared/dto/pagination.dto";
import {FindSubscribersUseCase} from "../application/use-cases/find-subscribers.use-case";
import {ApiKeyGuard} from "../../../shared/guards/api-key.guard";
import {FindSubscriberUseCase} from "../application/use-cases/find-subscriber.use-case";
import {UpdateSubscriberUseCase} from "../application/use-cases/update-subscriber.use-case";
import {UpdateSubscriberDto} from "./dto/update-subscriber.dto";
import {RemoveSubscriberUseCase} from "../application/use-cases/remove-subscriber.use-case";

@Controller('subscriber')
export class SubscriberController {

    constructor(
        private readonly createSubscriberUseCase: CreateSubscriberUseCase,
        private readonly findSubscribersUseCase: FindSubscribersUseCase,
        private readonly findSubscriberUseCase: FindSubscriberUseCase,
        private readonly updateSubscriberUseCase: UpdateSubscriberUseCase,
        private readonly removeSubscriberUseCase: RemoveSubscriberUseCase,
    ) {}

    @UseGuards(ApiKeyGuard)
    @Post()
    @ApiOperation({ summary: "Create a new subscriber" })
    async create(
        @Body() createSubscriberDto: CreateSubscriberDto,
        @TenantId() tenantId: string
    ): Promise<IControllerResponse<Subscriber>> {
        const subscriber = await this.createSubscriberUseCase.execute(createSubscriberDto, tenantId)
        return {
            data: subscriber,
            status: HttpStatus.CREATED,
            message: 'Subscriber created',
            success: true,
        }
    }

    @UseGuards(ApiKeyGuard)
    @Get()
    @ApiOperation({ summary: "Gets a list of subscribers" })
    async findAll(
        @Query() paginationDto: PaginationDto,
        @TenantId() tenantId: string
    ): Promise<IControllerResponse<{ subscribers: Subscriber[], metadata: IPaginationMetadata }>> {
        const subscribers = await this.findSubscribersUseCase.execute(paginationDto as IPagination, tenantId)
        return {
            data: subscribers,
            status: HttpStatus.OK,
            message: 'Subscriber list successfully',
            success: true,
        }
    }

    @UseGuards(ApiKeyGuard)
    @Get(':subscriberId')
    @ApiOperation({ summary: "Gets an specific subscriber" })
    async findOne(
        @Param('subscriberId') subscriberId: string,
        @TenantId() tenantId: string
    ): Promise<IControllerResponse<Subscriber | null>> {
        const subscriber = await this.findSubscriberUseCase.execute(subscriberId, tenantId);
        return {
            data: subscriber,
            status: HttpStatus.OK,
            message: 'Subscriber found',
            success: true
        }
    }

    @UseGuards(ApiKeyGuard)
    @Patch(':subscriberId')
    async update(
        @Body() updateSubscriberDto: UpdateSubscriberDto,
        @Param('subscriberId') subscriberId: string,
        @TenantId() tenantId: string
    ): Promise<IControllerResponse<Subscriber>>{
        const subscriber = await this.updateSubscriberUseCase.execute(updateSubscriberDto, subscriberId, tenantId);
        return {
            data: subscriber,
            status: HttpStatus.OK,
            message: 'Subscriber updated',
            success: true
        }
    }

    @UseGuards(ApiKeyGuard)
    @Delete(":subscriberId")
    async remove(
        @TenantId() tenantId: string,
        @Param('subscriberId') subscriberId: string
    ): Promise<IControllerResponse<any>>{
        await this.removeSubscriberUseCase.execute(tenantId, subscriberId);
        return {
            data: "Subscriber deleted",
            status: HttpStatus.OK,
            message: 'Subscriber deleted correctly',
            success: true
        }
    }

}