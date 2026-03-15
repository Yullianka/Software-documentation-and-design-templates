import { IRepository } from './repository.interface';
import { Passenger } from '../schemas/passenger.schema';

export interface IPassengerRepository extends IRepository<Passenger> {
  findByPhone(phone: string): Promise<Passenger | null>;
}

export const PASSENGER_REPOSITORY = 'PASSENGER_REPOSITORY';
