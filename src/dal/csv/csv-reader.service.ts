import { Injectable } from '@nestjs/common';
import { ICsvReader } from '../interfaces/csv-reader.interface';
import * as fs from 'fs';
import { parse } from 'csv-parse';

@Injectable()
export class CsvReaderService implements ICsvReader<Record<string, string>> {
  async read(filePath: string): Promise<Record<string, string>[]> {
    return new Promise((resolve, reject) => {
      const results: Record<string, string>[] = [];

      fs.createReadStream(filePath)
        .pipe(
          parse({
            columns: true,
            skip_empty_lines: true,
            trim: true,
          }),
        )
        .on('data', (row: Record<string, string>) => {
          results.push(row);
        })
        .on('end', () => {
          resolve(results);
        })
        .on('error', (error: Error) => {
          reject(error);
        });
    });
  }
}
