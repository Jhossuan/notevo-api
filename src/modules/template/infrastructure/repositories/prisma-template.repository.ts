import {Injectable} from "@nestjs/common";
import {PrismaService} from "../../../../shared/infrastructure/persistence/prisma.service";
import {ITemplateRepository} from "../../domain/repositories/template.repository";
import {ChannelEnum, Template} from "../../domain/entities/template.entity";
import {IPaginationMetadata} from "../../../../shared/interfaces/pagination.interface";


@Injectable()
export class PrismaTemplateRepository implements ITemplateRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(template: Template): Promise<Template> {
        const newTemplate = await this.prisma.template.create({
            data: {
                id: template.id,
                tenantId: template.tenantId,
                name: template.name,
                channel: template.channel,
                subject: template.subject,
                body: template.body,
                variables: template.variables,
            }
        })

        return Template.get({
            id: newTemplate.id,
            tenantId: newTemplate.tenantId,
            name: newTemplate.name,
            channel: newTemplate.channel as unknown as ChannelEnum,
            subject: newTemplate.subject,
            body: newTemplate.body,
            variables: newTemplate.variables,
            active: newTemplate.active,
            createdAt: newTemplate.createdAt,
            updatedAt: newTemplate.updatedAt,
        })
    }

    async update(template: Template): Promise<Template> {
        const templateUpdated = await this.prisma.template.update({
            where: { id: template.id, active: true },
            data: {
                name: template.name,
                channel: template.channel,
                subject: template.subject,
                body: template.body,
                variables: template.variables,
            }
        })

        return Template.get({
            id: templateUpdated.id,
            tenantId: templateUpdated.tenantId,
            name: templateUpdated.name,
            channel: templateUpdated.channel as unknown as ChannelEnum,
            subject: templateUpdated.subject,
            body: templateUpdated.body,
            variables: templateUpdated.variables,
            active: templateUpdated.active,
            createdAt: templateUpdated.createdAt,
            updatedAt: templateUpdated.updatedAt,
        })
    }

    async findAll(
        tenantId: string,
        page: number,
        limit: number
    ): Promise<{ templates: Template[], metadata: IPaginationMetadata }> {
        const totalDocuments = await this.prisma.template.count({
            where: { tenantId: tenantId, active: true },
        });

        const templates = await this.prisma.template.findMany({
            where: { tenantId: tenantId,  active: true },
            skip: (page - 1) * limit,
            take: limit,
        })

        return {
            templates: templates.map(template => Template.get({
                id: template.id,
                tenantId: template.tenantId,
                name: template.name,
                channel: template.channel as unknown as ChannelEnum,
                subject: template.subject,
                body: template.body,
                variables: template.variables,
                active: template.active,
                createdAt: template.createdAt,
                updatedAt: template.updatedAt,
            })),
            metadata: {
                currentPage: page,
                lastPage: Math.ceil(totalDocuments / limit),
                totalDocuments: totalDocuments
            }
        }

    }

    async findById(id: string, tenantId: string): Promise<Template | null> {
        const template = await this.prisma.template.findUnique({
            where: { id: id, tenantId: tenantId, active: true },
        })

        if(!template) return null;

        return Template.get({
            id: template.id,
            tenantId: template.tenantId,
            name: template.name,
            channel: template.channel as unknown as ChannelEnum,
            subject: template.subject,
            body: template.body,
            variables: template.variables,
            active: template.active,
            createdAt: template.createdAt,
            updatedAt: template.updatedAt,
        })
    }

    async delete(id: string): Promise<void> {
        await this.prisma.template.update({
            where: { id },
            data: {
                active: false,
            }
        })
    }

}