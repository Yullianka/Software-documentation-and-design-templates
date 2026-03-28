import { Module } from '@nestjs/common';
import { DalModule } from '../dal/dal.module';
import { DataImportService } from './services/data-import.service';
import { DATA_IMPORT_SERVICE } from './interfaces/data-import-service.interface';
import { PassengerService } from './services/passenger.service';
import { PASSENGER_SERVICE } from './interfaces/passenger-service.interface';
import { DriverService } from './services/driver.service';
import { DRIVER_SERVICE } from './interfaces/driver-service.interface';
import { RideService } from './services/ride.service';
import { RIDE_SERVICE } from './interfaces/ride-service.interface';

@Module({
  imports: [DalModule],
  providers: [
    { provide: DATA_IMPORT_SERVICE, useClass: DataImportService },
    { provide: PASSENGER_SERVICE, useClass: PassengerService },
    { provide: DRIVER_SERVICE, useClass: DriverService },
    { provide: RIDE_SERVICE, useClass: RideService },
  ],
  exports: [DATA_IMPORT_SERVICE, PASSENGER_SERVICE, DRIVER_SERVICE, RIDE_SERVICE],
})
export class BllModule {}
