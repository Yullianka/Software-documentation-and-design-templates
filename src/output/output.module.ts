import { Module } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { OutputService } from './output.service';
import { OUTPUT_STRATEGY } from './interfaces/output-strategy.interface';
import { ConsoleOutputStrategy } from './strategies/console-output.strategy';
import { KafkaOutputStrategy } from './strategies/kafka-output.strategy';
import { RedisOutputStrategy } from './strategies/redis-output.strategy';

function resolveStrategyClass() {
  const configPath = path.resolve(process.cwd(), 'config/output.config.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8')) as { strategy: string };

  switch (config.strategy) {
    case 'kafka':
      return KafkaOutputStrategy;
    case 'redis':
      return RedisOutputStrategy;
    default:
      return ConsoleOutputStrategy;
  }
}

@Module({
  providers: [
    {
      provide: OUTPUT_STRATEGY,
      useClass: resolveStrategyClass(),
    },
    OutputService,
  ],
  exports: [OutputService],
})
export class OutputModule {}
