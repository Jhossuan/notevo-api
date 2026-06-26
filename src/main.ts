import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envValidation } from './config/env.validation'
import {Logger, ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const logger = new Logger("Main");
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true
      })
  );

  app.setGlobalPrefix("api")

  await app.listen(envValidation.port);
  logger.log(`Notevo API is running on http://localhost:${envValidation.port}`);
}
bootstrap();
