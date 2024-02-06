import { Body, Controller, Get, Inject, OnModuleDestroy, OnModuleInit, Post } from '@nestjs/common';
import { KafkaService } from './kafka/consumer.service';
import { ProductDto } from './dto/products.dto';


@Controller()
export class AppController implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly kafkaService: KafkaService) {
    this.consumeMessage();
  }

  @Post('produce')
  async produceMessage(@Body() body:ProductDto): Promise<string> {
    await this.kafkaService.send('test', body);
    return 'Message sent to Kafka';
  }


  async consumeMessage(): Promise<string> {
    this.kafkaService.subscribe('test', (message) => {
      console.log('Received message:', message);
    });
    return 'Started consuming messages from Kafka';
  }

  async onModuleInit() {
    await this.kafkaService.onModuleInit();
  }

  async onModuleDestroy() {
    await this.kafkaService.onModuleDestroy();
  }
}
