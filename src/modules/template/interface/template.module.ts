import {Module} from "@nestjs/common";
import {PrismaModule} from "../../../shared/infrastructure/persistence/prisma.module";
import {TemplateController} from "./template.controller";
import {TEMPLATE_REPOSITORY_TOKEN} from "../domain/tokens/template.tokens";
import {PrismaTemplateRepository} from "../infrastructure/repositories/prisma-template.repository";
import {CreateTemplateUseCase} from "../application/use-cases/create-template.use-case";
import {ITemplateRepository} from "../domain/repositories/template.repository";
import {FindTemplatesUseCase} from "../application/use-cases/find-templates.use-case";
import {UpdateTemplateUseCase} from "../application/use-cases/update-template.use-case";
import {FindTemplateUseCase} from "../application/use-cases/find-template.use-case";
import {DeleteTemplateUseCase} from "../application/use-cases/delete-template.use-case";

@Module({
    imports: [PrismaModule],
    providers: [
        {
            provide: TEMPLATE_REPOSITORY_TOKEN,
            useClass: PrismaTemplateRepository
        },
        {
            provide: CreateTemplateUseCase,
            useFactory: (
                templateRepository: ITemplateRepository,
            ) => new CreateTemplateUseCase(templateRepository),
            inject: [TEMPLATE_REPOSITORY_TOKEN]
        },
        {
            provide: FindTemplatesUseCase,
            useFactory: (
                templateRepository: ITemplateRepository,
            ) => new FindTemplatesUseCase(templateRepository),
            inject: [TEMPLATE_REPOSITORY_TOKEN]
        },
        {
            provide: UpdateTemplateUseCase,
            useFactory: (
                templateRepository: ITemplateRepository,
            ) => new UpdateTemplateUseCase(templateRepository),
            inject: [TEMPLATE_REPOSITORY_TOKEN]
        },
        {
            provide: FindTemplateUseCase,
            useFactory: (
                templateRepository: ITemplateRepository,
            ) => new FindTemplateUseCase(templateRepository),
            inject: [TEMPLATE_REPOSITORY_TOKEN]
        },
        {
            provide: DeleteTemplateUseCase,
            useFactory: (
                templateRepository: ITemplateRepository,
            ) => new DeleteTemplateUseCase(templateRepository),
            inject: [TEMPLATE_REPOSITORY_TOKEN]
        },
    ],
    controllers: [TemplateController],
})
export class TemplateModule {}