import { Controller, Post, Body, Inject } from '@nestjs/common';
import { IDataImportController } from '../interfaces/data-import-controller.interface';
import { IDataImportService, DATA_IMPORT_SERVICE } from '../../bll/interfaces/data-import-service.interface';

@Controller('import')
export class DataImportController implements IDataImportController {
  constructor(
    @Inject(DATA_IMPORT_SERVICE)
    private readonly dataImportService: IDataImportService,
  ) {}

  @Post('csv')
  async importCsv(@Body() body: { filePath: string }) {
    return this.dataImportService.importFromCsv(body.filePath);
  }
}
