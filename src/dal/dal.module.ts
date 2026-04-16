import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Passenger, PassengerSchema } from './schemas/passenger.schema';
import { Driver, DriverSchema } from './schemas/driver.schema';
import { Car, CarSchema } from './schemas/car.schema';
import { Ride, RideSchema } from './schemas/ride.schema';
import { Payment, PaymentSchema } from './schemas/payment.schema';
import { Rating, RatingSchema } from './schemas/rating.schema';
import { PassengerRepository } from './repositories/passenger.repository';
import { DriverRepository } from './repositories/driver.repository';
import { CarRepository } from './repositories/car.repository';
import { RideRepository } from './repositories/ride.repository';
import { PaymentRepository } from './repositories/payment.repository';
import { RatingRepository } from './repositories/rating.repository';
import { CsvReaderService } from './csv/csv-reader.service';
import { PASSENGER_REPOSITORY } from './interfaces/passenger-repository.interface';
import { DRIVER_REPOSITORY } from './interfaces/driver-repository.interface';
import { CAR_REPOSITORY } from './interfaces/car-repository.interface';
import { RIDE_REPOSITORY } from './interfaces/ride-repository.interface';
import { PAYMENT_REPOSITORY } from './interfaces/payment-repository.interface';
import { RATING_REPOSITORY } from './interfaces/rating-repository.interface';
import { CSV_READER } from './interfaces/csv-reader.interface';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Passenger.name, schema: PassengerSchema },
      { name: Driver.name, schema: DriverSchema },
      { name: Car.name, schema: CarSchema },
      { name: Ride.name, schema: RideSchema },
      { name: Payment.name, schema: PaymentSchema },
      { name: Rating.name, schema: RatingSchema },
    ]),
  ],
  providers: [
    { provide: PASSENGER_REPOSITORY, useClass: PassengerRepository },
    { provide: DRIVER_REPOSITORY, useClass: DriverRepository },
    { provide: CAR_REPOSITORY, useClass: CarRepository },
    { provide: RIDE_REPOSITORY, useClass: RideRepository },
    { provide: PAYMENT_REPOSITORY, useClass: PaymentRepository },
    { provide: RATING_REPOSITORY, useClass: RatingRepository },
    { provide: CSV_READER, useClass: CsvReaderService },
  ],
  exports: [
    PASSENGER_REPOSITORY,
    DRIVER_REPOSITORY,
    CAR_REPOSITORY,
    RIDE_REPOSITORY,
    PAYMENT_REPOSITORY,
    RATING_REPOSITORY,
    CSV_READER,
  ],
})
export class DalModule {}
