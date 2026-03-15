export interface ICsvReader<T> {
  read(filePath: string): Promise<T[]>;
}

export const CSV_READER = 'CSV_READER';
