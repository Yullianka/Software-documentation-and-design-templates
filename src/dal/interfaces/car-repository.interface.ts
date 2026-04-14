import { IRepository } from './repository.interface';
import { Car } from '../schemas/car.schema';

export interface ICarRepository extends IRepository<Car> {
  findByPlateNumber(plateNumber: string): Promise<Car | null>;
}

export const CAR_REPOSITORY = 'CAR_REPOSITORY';
