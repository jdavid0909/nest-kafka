import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaService } from './kafka/consumer.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, KafkaService],
  exports:[KafkaService]
})
export class AppModule {}
