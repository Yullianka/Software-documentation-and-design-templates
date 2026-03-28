import { Driver } from '@dal/schemas/driver.schema';

export interface IDriverService {
  findAll(): Promise<Driver[]>;
  findById(id: string): Promise<Driver | null>;
  create(data: Partial<Driver>): Promise<Driver>;
  update(id: string, data: Partial<Driver>): Promise<Driver | null>;
  delete(id: string): Promise<boolean>;
}

export const DRIVER_SERVICE = 'DRIVER_SERVICE';
