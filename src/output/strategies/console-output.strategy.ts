import { Injectable } from '@nestjs/common';
import { IOutputStrategy } from '../interfaces/output-strategy.interface';

@Injectable()
export class ConsoleOutputStrategy implements IOutputStrategy {
  async write(data: Record<string, string>): Promise<void> {
    const line = Object.entries(data)
      .map(([key, value]) => `${key}: ${value}`)
      .join(' | ');
    console.log(line);
  }

  async flush(): Promise<void> {}
}
