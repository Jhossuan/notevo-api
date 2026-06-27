import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envValidation } from './config/env.validation'
import {Logger, ValidationPipe} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

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

  const config = new DocumentBuilder()
      .setTitle("Notevo API documentation")
      .setDescription("Documentation to integrate Notevo in your system and work with efficiently ")
      .setVersion(envValidation.version)
      .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  await app.listen(envValidation.port);
  logger.log(`Notevo API is running on http://localhost:${envValidation.port}`);
}
bootstrap();
