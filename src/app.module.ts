import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {envsSchema} from "./config/env.validation";
import {PrismaModule} from "./shared/infrastructure/persistence/prisma.module";
import {TenantModule} from "./modules/tenant/interface/tenant.module";

@Module({
  imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: '.env',
        validationSchema: envsSchema
      }),
      PrismaModule,
      TenantModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
