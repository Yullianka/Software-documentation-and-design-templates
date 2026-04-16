import * as https from 'https';
import * as fs from 'fs';
import * as path from 'path';

const DATASET_ID = 'x5ih-idh7';
const HOST = 'www.dallasopendata.com';
const LIMIT = 1000;
const OFFSET = 0;

const url = `https://${HOST}/resource/${DATASET_ID}.csv?$limit=${LIMIT}&$offset=${OFFSET}`;

function download(targetUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get(targetUrl, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        resolve(download(res.headers.location!));
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}: ${targetUrl}`));
        return;
      }

      const chunks: Buffer[] = [];
      res.on('data', (chunk: Buffer) => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function main(): Promise<void> {
  console.log(`Завантажую дані з: ${url}`);

  const csv = await download(url);

  const lines = csv.split('\n').filter((l) => l.trim().length > 0);
  console.log(`Отримано рядків (включно з заголовком): ${lines.length}`);

  const outputPath = path.resolve(process.cwd(), 'data/vendor-payments.csv');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, csv, 'utf-8');

  console.log(`Збережено → ${outputPath}`);
  console.log(`\nПерші 3 рядки:`);
  lines.slice(0, 3).forEach((l) => console.log(' ', l));
}

main().catch((err) => {
  console.error('Помилка:', err.message);
  process.exit(1);
});
