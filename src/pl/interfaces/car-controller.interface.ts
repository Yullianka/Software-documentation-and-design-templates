import { Car } from '../../dal/schemas/car.schema';

export interface ICarController {
  findAll(): Promise<Car[]>;
  findById(id: string): Promise<Car | null>;
  create(data: Partial<Car>): Promise<Car>;
  update(id: string, data: Partial<Car>): Promise<Car | null>;
  delete(id: string): Promise<boolean>;
}
