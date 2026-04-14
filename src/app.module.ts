import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DalModule } from './dal/dal.module';
import { BllModule } from './bll/bll.module';
import { PlModule } from './pl/pl.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/vendor_payments_platform'),
    DalModule,
    BllModule,
    PlModule,
  ],
})
export class AppModule {}
