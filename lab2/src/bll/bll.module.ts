import { Module } from '@nestjs/common';
import { DalModule } from '../dal/dal.module';
import { DataImportService } from './services/data-import.service';
import { DATA_IMPORT_SERVICE } from './interfaces/data-import-service.interface';

@Module({
  imports: [DalModule],
  providers: [
    { provide: DATA_IMPORT_SERVICE, useClass: DataImportService },
  ],
  exports: [DATA_IMPORT_SERVICE],
})
export class BllModule {}
