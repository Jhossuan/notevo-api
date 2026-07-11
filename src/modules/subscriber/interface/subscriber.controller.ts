import {Controller, Post, Body, HttpStatus} from "@nestjs/common";
import {CreateSubscriberUseCase} from "../application/use-cases/create-subscriber.use-case";
import {ApiOperation} from "@nestjs/swagger";
import {TenantId} from "../../../shared/decorators/tenant-id.decorator";
import {CreateSubscriberDto} from "./dto/create-subscriber.dto";
import {IControllerResponse} from "../../../shared/interfaces/response.interface";
import {Subscriber} from "../domain/entities/subscriber.entity";

@Controller('subscriber')
export class SubscriberController {

    constructor(
        private readonly createSubscriberUseCase: CreateSubscriberUseCase,
    ) {}

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
}