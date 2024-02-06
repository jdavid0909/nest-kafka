import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log("la aplicacion esta funcionando");
  
  

  await app.listen(3000);
}
bootstrap();
