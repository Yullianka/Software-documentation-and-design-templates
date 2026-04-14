import { Passenger } from '@dal/schemas/passenger.schema';

export interface IPassengerService {
  findAll(): Promise<Passenger[]>;
  findById(id: string): Promise<Passenger | null>;
  create(data: Partial<Passenger>): Promise<Passenger>;
  update(id: string, data: Partial<Passenger>): Promise<Passenger | null>;
  delete(id: string): Promise<boolean>;
}

export const PASSENGER_SERVICE = 'PASSENGER_SERVICE';
