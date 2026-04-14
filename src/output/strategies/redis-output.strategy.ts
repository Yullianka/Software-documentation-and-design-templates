import { Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { IOutputStrategy } from '../interfaces/output-strategy.interface';
import * as fs from 'fs';
import * as path from 'path';

interface RedisConfig {
  host: string;
  port: number;
  keyPrefix: string;
}

@Injectable()
export class RedisOutputStrategy implements IOutputStrategy {
  private readonly logger = new Logger(RedisOutputStrategy.name);
  private readonly config: RedisConfig;
  private readonly client: Redis;

  constructor() {
    const configPath = path.resolve(process.cwd(), 'config/output.config.json');
    const raw = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    this.config = raw.redis;

    this.client = new Redis({
      host: this.config.host,
      port: this.config.port,
      lazyConnect: true,
    });
  }

  async write(data: Record<string, string>): Promise<void> {
    const checkNumber = data['Check Number'] ?? data['docid'] ?? Date.now().toString();
    const key = `${this.config.keyPrefix}${checkNumber}`;
    await this.client.set(key, JSON.stringify(data));
    this.logger.debug(`SET ${key}`);
  }

  async flush(): Promise<void> {
    await this.client.quit();
    this.logger.log('Redis connection closed');
  }
}
