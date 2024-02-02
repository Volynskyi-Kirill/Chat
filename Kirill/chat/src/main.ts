import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './shared/config/swagger.config';
import { CorsConfig } from './shared/config/cors.config';
import { connectMicroserviceConfig } from './shared/config/connect-microservice.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice(connectMicroserviceConfig);
  app.enableCors(CorsConfig);

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/docs', app, document);

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
