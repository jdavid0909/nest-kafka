// src/kafka.service.ts
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Kafka, Producer, Consumer } from 'kafkajs';
import { ProductDto } from 'src/dto/products.dto';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
    private kafka: Kafka;
    private producer: Producer;
    private consumer: Consumer;

    constructor() {
        this.kafka = new Kafka({
            clientId: 'nestjs-kafka-app',
            brokers: ['localhost:9092'], // Cambia a la dirección y el puerto de tu servidor Kafka
        });

        this.producer = this.kafka.producer();
        this.consumer = this.kafka.consumer({ groupId: 'nestjs-group' });
    }

    async send(topic: string, messages: ProductDto) {

        await this.producer.connect();
        await this.producer.send({
            topic,
            messages: [{ value: JSON.stringify(messages) }]
        });
        await this.producer.disconnect();
    }

    async subscribe(topic: string, callback: (message: any) => void) {
        await this.consumer.connect();
        await this.consumer.subscribe({ topic });
        await this.consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                callback({
                    topic,
                    partition,
                    offset: message.offset,
                    value: message.value.toString(),
                });
            },
        });
    }

    async disconnect() {
        await this.consumer.disconnect();
    }

    async onModuleInit() {
        await this.consumer.connect();
    }

    async onModuleDestroy() {
        await this.consumer.disconnect();
    }
}
