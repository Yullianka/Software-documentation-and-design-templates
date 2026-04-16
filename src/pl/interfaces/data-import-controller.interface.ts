export interface IDataImportController {
  importCsv(body: { filePath: string }): Promise<any>;
}
