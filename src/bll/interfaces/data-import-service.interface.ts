export interface IDataImportService {
  importFromCsv(filePath: string): Promise<{ passengers: number; drivers: number; cars: number; rides: number; payments: number; ratings: number }>;
}

export const DATA_IMPORT_SERVICE = 'DATA_IMPORT_SERVICE';
