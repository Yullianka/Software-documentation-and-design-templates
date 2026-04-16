import * as fs from 'fs';
import * as path from 'path';
import { CsvReaderService } from '../dal/csv/csv-reader.service';
import { ConsoleOutputStrategy } from '../output/strategies/console-output.strategy';
import { KafkaOutputStrategy } from '../output/strategies/kafka-output.strategy';
import { RedisOutputStrategy } from '../output/strategies/redis-output.strategy';
import { FirebaseOutputStrategy } from '../output/strategies/firebase-output.strategy';
import { IOutputStrategy } from '../output/interfaces/output-strategy.interface';

function buildStrategy(): IOutputStrategy {
  const configPath = path.resolve(process.cwd(), 'config/output.config.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8')) as { strategy: string };

  switch (config.strategy) {
    case 'kafka':
      return new KafkaOutputStrategy();
    case 'redis':
      return new RedisOutputStrategy();
    case 'firebase':
      return new FirebaseOutputStrategy();
    default:
      return new ConsoleOutputStrategy();
  }
}

async function main(): Promise<void> {
  const csvPath = path.resolve(process.cwd(), 'data/vendor-payments.csv');

  if (!fs.existsSync(csvPath)) {
    console.error(`CSV file not found: ${csvPath}`);
    console.error('Run "npm run generate-vendor-payments" first.');
    process.exit(1);
  }

  const strategy = buildStrategy();
  const csvReader = new CsvReaderService();

  console.log(`Reading: ${csvPath}`);
  const records = await csvReader.read(csvPath);
  console.log(`Loaded ${records.length} records. Strategy: ${strategy.constructor.name}\n`);

  for (const record of records) {
    await strategy.write(record);
  }

  await strategy.flush();
  console.log('\nDone.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
