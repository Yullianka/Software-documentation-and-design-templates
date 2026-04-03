import { Module } from '@nestjs/common';
import { BllModule } from '../bll/bll.module';
import { DataImportController } from './controllers/data-import.controller';
import { PassengerController } from './controllers/passenger.controller';
import { DriverController } from './controllers/driver.controller';
import { RideController } from './controllers/ride.controller';

@Module({
  imports: [BllModule],
  controllers: [DataImportController, PassengerController, DriverController, RideController],
})
export class PlModule {}
