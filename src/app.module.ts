import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {envsSchema} from "./config/env.validation";
import {PrismaModule} from "./shared/infrastructure/persistence/prisma.module";

@Module({
  imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: '.env',
        validationSchema: envsSchema
      }),
      PrismaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
