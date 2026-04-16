import { Injectable, Logger } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';
import { IOutputStrategy } from '../interfaces/output-strategy.interface';
import * as fs from 'fs';
import * as path from 'path';

interface KafkaConfig {
  brokers: string[];
  topic: string;
  clientId: string;
}

@Injectable()
export class KafkaOutputStrategy implements IOutputStrategy {
  private readonly logger = new Logger(KafkaOutputStrategy.name);
  private readonly config: KafkaConfig;
  private readonly producer: Producer;
  private readonly buffer: { value: string }[] = [];

  constructor() {
    const configPath = path.resolve(process.cwd(), 'config/output.config.json');
    const raw = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    this.config = raw.kafka;

    const kafka = new Kafka({
      clientId: this.config.clientId,
      brokers: this.config.brokers,
    });

    this.producer = kafka.producer();
  }

  async write(data: Record<string, string>): Promise<void> {
    this.buffer.push({ value: JSON.stringify(data) });
  }

  async flush(): Promise<void> {
    if (this.buffer.length === 0) return;

    this.logger.log(`Connecting to Kafka at ${this.config.brokers.join(', ')}...`);
    await this.producer.connect();

    await this.producer.send({
      topic: this.config.topic,
      messages: this.buffer,
    });

    this.logger.log(
      `Sent ${this.buffer.length} messages → topic "${this.config.topic}"`,
    );

    await this.producer.disconnect();
    this.buffer.length = 0;
  }
}
