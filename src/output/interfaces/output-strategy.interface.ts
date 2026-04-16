export interface IOutputStrategy {
  write(data: Record<string, string>): Promise<void>;
  flush(): Promise<void>;
}

export const OUTPUT_STRATEGY = 'OUTPUT_STRATEGY';
