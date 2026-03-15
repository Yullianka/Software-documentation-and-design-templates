import { Module } from '@nestjs/common';
import { BllModule } from '../bll/bll.module';
import { DataImportController } from './controllers/data-import.controller';

@Module({
  imports: [BllModule],
  controllers: [DataImportController],
})
export class PlModule {}
