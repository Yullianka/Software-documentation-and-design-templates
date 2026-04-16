import { Injectable, Inject } from '@nestjs/common';
import { IOutputStrategy, OUTPUT_STRATEGY } from './interfaces/output-strategy.interface';

@Injectable()
export class OutputService {
  constructor(
    @Inject(OUTPUT_STRATEGY)
    private readonly strategy: IOutputStrategy,
  ) {}

  async write(data: Record<string, string>): Promise<void> {
    return this.strategy.write(data);
  }

  async flush(): Promise<void> {
    return this.strategy.flush();
  }
}
