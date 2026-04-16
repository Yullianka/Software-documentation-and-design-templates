import * as fs from 'fs';
import * as path from 'path';
import { stringify } from 'csv-stringify/sync';

const TOTAL_ROWS = 500;

const fiscalYears = ['2020', '2021', '2022', '2023', '2024'];

const documentTypes = ['Invoice', 'Purchase Order', 'Direct Payment', 'Contract Payment', 'Grant Payment'];

const vendorNames = [
  'ABC Construction LLC', 'City Tech Solutions', 'Green Park Services',
  'Metro Cleaning Corp', 'Urban Design Associates', 'Skyline Engineering',
  'FastTrack Logistics', 'Apex IT Systems', 'BlueStar Consulting',
  'Summit Healthcare', 'Delta Security Group', 'Horizon Media Group',
  'Pacific Supplies Co', 'ClearPath Analytics', 'Nexus Communications',
  'Atlas Maintenance Inc', 'Pioneer Legal Services', 'Zenith Printing',
  'Cascade Utilities', 'Redwood Financial Group',
];

const departments = [
  'Public Works', 'Parks & Recreation', 'Police Department',
  'Fire Department', 'Information Technology', 'Finance',
  'Human Resources', 'Transportation', 'Utilities', 'Health Services',
  'Library Services', 'Planning & Development', 'City Manager Office',
];

const funds = [
  'General Fund', 'Capital Projects Fund', 'Debt Service Fund',
  'Enterprise Fund', 'Special Revenue Fund', 'Internal Service Fund',
];

const expenseTypes = [
  'Professional Services', 'Construction & Repair', 'Equipment Purchase',
  'Software & Licensing', 'Office Supplies', 'Utilities',
  'Maintenance & Operations', 'Training & Education', 'Travel',
  'Healthcare & Benefits',
];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomAmount(): string {
  return (Math.random() * 99_900 + 100).toFixed(2);
}

function randomDate(year: string): string {
  const month = String(randomInt(1, 12)).padStart(2, '0');
  const day = String(randomInt(1, 28)).padStart(2, '0');
  return `${month}/${day}/${year}`;
}

function randomCheckNumber(): string {
  return String(randomInt(100_000, 999_999));
}

function randomVendorNumber(): string {
  return `V${String(randomInt(10_000, 99_999))}`;
}

function randomZip(): string {
  return String(randomInt(70_000, 79_999));
}

const headers = [
  'Fiscal Year',
  'Document Type',
  'Vendor Name',
  'Vendor Number',
  'Vendor Zip Code',
  'Department',
  'Fund',
  'Object/Expense Type',
  'Payment Date',
  'Check Number',
  'Amount',
];

const rows: string[][] = [];

for (let i = 0; i < TOTAL_ROWS; i++) {
  const fiscalYear = randomItem(fiscalYears);
  rows.push([
    fiscalYear,
    randomItem(documentTypes),
    randomItem(vendorNames),
    randomVendorNumber(),
    randomZip(),
    randomItem(departments),
    randomItem(funds),
    randomItem(expenseTypes),
    randomDate(fiscalYear),
    randomCheckNumber(),
    randomAmount(),
  ]);
}

const csv = stringify(rows, { header: true, columns: headers });

const outputPath = path.resolve(process.cwd(), 'data/vendor-payments.csv');
const outputDir = path.dirname(outputPath);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(outputPath, csv, 'utf-8');
console.log(`Generated ${TOTAL_ROWS} vendor payment records → ${outputPath}`);
