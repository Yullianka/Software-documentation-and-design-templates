import { IRepository } from './repository.interface';
import { Driver } from '../schemas/driver.schema';

export interface IDriverRepository extends IRepository<Driver> {
  findByLicenseNumber(licenseNumber: string): Promise<Driver | null>;
}

export const DRIVER_REPOSITORY = 'DRIVER_REPOSITORY';
