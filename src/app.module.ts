import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {envsSchema} from "./config/env.validation";

@Module({
  imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: '.env',
        validationSchema: envsSchema
      })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
