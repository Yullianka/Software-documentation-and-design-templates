import { Injectable, Inject, Logger } from '@nestjs/common';
import { IDataImportService } from '../interfaces/data-import-service.interface';
import { ICsvReader, CSV_READER } from '../../dal/interfaces/csv-reader.interface';
import { IPassengerRepository, PASSENGER_REPOSITORY } from '../../dal/interfaces/passenger-repository.interface';
import { IDriverRepository, DRIVER_REPOSITORY } from '../../dal/interfaces/driver-repository.interface';
import { ICarRepository, CAR_REPOSITORY } from '../../dal/interfaces/car-repository.interface';
import { IRideRepository, RIDE_REPOSITORY } from '../../dal/interfaces/ride-repository.interface';
import { IPaymentRepository, PAYMENT_REPOSITORY } from '../../dal/interfaces/payment-repository.interface';
import { IRatingRepository, RATING_REPOSITORY } from '../../dal/interfaces/rating-repository.interface';
import { Types } from 'mongoose';

@Injectable()
export class DataImportService implements IDataImportService {
  private readonly logger = new Logger(DataImportService.name);

  constructor(
    @Inject(CSV_READER)
    private readonly csvReader: ICsvReader<Record<string, string>>,
    @Inject(PASSENGER_REPOSITORY)
    private readonly passengerRepository: IPassengerRepository,
    @Inject(DRIVER_REPOSITORY)
    private readonly driverRepository: IDriverRepository,
    @Inject(CAR_REPOSITORY)
    private readonly carRepository: ICarRepository,
    @Inject(RIDE_REPOSITORY)
    private readonly rideRepository: IRideRepository,
    @Inject(PAYMENT_REPOSITORY)
    private readonly paymentRepository: IPaymentRepository,
    @Inject(RATING_REPOSITORY)
    private readonly ratingRepository: IRatingRepository,
  ) {}

  async importFromCsv(
    filePath: string,
  ): Promise<{ passengers: number; drivers: number; cars: number; rides: number; payments: number; ratings: number }> {
    this.logger.log(`Reading CSV file: ${filePath}`);
    const rows = await this.csvReader.read(filePath);
    this.logger.log(`Read ${rows.length} rows from CSV`);

    const passengerMap = new Map<string, { name: string; phone: string; rating: number; paymentMethod: string }>();
    const driverMap = new Map<string, { name: string; phone: string; rating: number; licenseNumber: string; status: string; currentLocation: string }>();
    const carMap = new Map<string, { carModel: string; plateNumber: string; status: string; location: string; driverLicense: string }>();

    const rideDataList: {
      passengerPhone: string;
      driverLicense: string;
      startPoint: string;
      destination: string;
      price: number;
      rideStatus: string;
      paymentAmount: number;
      paymentStatus: string;
      paymentMethod: string;
      ratingScore: number;
      ratingComment: string;
    }[] = [];

    for (const row of rows) {
      const passengerPhone = row['passenger_phone'];
      if (!passengerMap.has(passengerPhone)) {
        passengerMap.set(passengerPhone, {
          name: row['passenger_name'],
          phone: passengerPhone,
          rating: parseFloat(row['passenger_rating']),
          paymentMethod: row['passenger_paymentMethod'],
        });
      }

      const driverLicense = row['driver_licenseNumber'];
      if (!driverMap.has(driverLicense)) {
        driverMap.set(driverLicense, {
          name: row['driver_name'],
          phone: row['driver_phone'],
          rating: parseFloat(row['driver_rating']),
          licenseNumber: driverLicense,
          status: row['driver_status'],
          currentLocation: row['driver_currentLocation'],
        });
      }

      const plateNumber = row['car_plateNumber'];
      if (!carMap.has(plateNumber)) {
        carMap.set(plateNumber, {
          carModel: row['car_model'],
          plateNumber,
          status: row['car_status'],
          location: row['car_location'],
          driverLicense,
        });
      }

      rideDataList.push({
        passengerPhone,
        driverLicense,
        startPoint: row['ride_startPoint'],
        destination: row['ride_destination'],
        price: parseFloat(row['ride_price']),
        rideStatus: row['ride_status'],
        paymentAmount: parseFloat(row['payment_amount']),
        paymentStatus: row['payment_status'],
        paymentMethod: row['payment_paymentMethod'],
        ratingScore: parseInt(row['rating_score'], 10),
        ratingComment: row['rating_comment'],
      });
    }

    this.logger.log(`Saving ${passengerMap.size} passengers...`);
    const savedPassengers = await this.passengerRepository.createMany(
      Array.from(passengerMap.values()),
    );
    const phoneToPassengerId = new Map<string, Types.ObjectId>();
    for (const p of savedPassengers) {
      phoneToPassengerId.set(p.phone, p._id as Types.ObjectId);
    }

    this.logger.log(`Saving ${driverMap.size} drivers...`);
    const savedDrivers = await this.driverRepository.createMany(
      Array.from(driverMap.values()),
    );
    const licenseToDriverId = new Map<string, Types.ObjectId>();
    for (const d of savedDrivers) {
      licenseToDriverId.set(d.licenseNumber, d._id as Types.ObjectId);
    }

    this.logger.log(`Saving ${carMap.size} cars...`);
    const carData = Array.from(carMap.values()).map((c) => ({
      carModel: c.carModel,
      plateNumber: c.plateNumber,
      status: c.status,
      location: c.location,
      driverId: licenseToDriverId.get(c.driverLicense)!,
    }));
    const savedCars = await this.carRepository.createMany(carData);

    this.logger.log(`Saving ${rideDataList.length} rides...`);
    const rideInserts = rideDataList.map((r) => ({
      passengerId: phoneToPassengerId.get(r.passengerPhone)!,
      driverId: licenseToDriverId.get(r.driverLicense)!,
      startPoint: r.startPoint,
      destination: r.destination,
      price: r.price,
      status: r.rideStatus,
    }));
    const savedRides = await this.rideRepository.createMany(rideInserts);

    this.logger.log(`Saving ${savedRides.length} payments...`);
    const paymentInserts = savedRides.map((ride, i) => ({
      rideId: ride._id as Types.ObjectId,
      amount: rideDataList[i].paymentAmount,
      status: rideDataList[i].paymentStatus,
      paymentMethod: rideDataList[i].paymentMethod,
    }));
    const savedPayments = await this.paymentRepository.createMany(paymentInserts);

    const ratingInserts = savedRides
      .map((ride, i) => ({
        rideId: ride._id as Types.ObjectId,
        score: rideDataList[i].ratingScore,
        comment: rideDataList[i].ratingComment,
      }))
      .filter((r) => r.score > 0);

    this.logger.log(`Saving ${ratingInserts.length} ratings...`);
    const savedRatings = await this.ratingRepository.createMany(ratingInserts);

    this.logger.log('Import complete.');
    return {
      passengers: savedPassengers.length,
      drivers: savedDrivers.length,
      cars: savedCars.length,
      rides: savedRides.length,
      payments: savedPayments.length,
      ratings: savedRatings.length,
    };
  }
}
