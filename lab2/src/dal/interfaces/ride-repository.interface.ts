import { IRepository } from './repository.interface';
import { Ride } from '../schemas/ride.schema';

export interface IRideRepository extends IRepository<Ride> {
  findByPassengerId(passengerId: string): Promise<Ride[]>;
  findByDriverId(driverId: string): Promise<Ride[]>;
  findByStatus(status: string): Promise<Ride[]>;
}

export const RIDE_REPOSITORY = 'RIDE_REPOSITORY';
