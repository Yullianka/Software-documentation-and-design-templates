import { Injectable, Inject } from '@nestjs/common';
import { IDriverService } from '../interfaces/driver-service.interface';
import { IDriverRepository, DRIVER_REPOSITORY } from '@dal/interfaces/driver-repository.interface';
import { Driver } from '@dal/schemas/driver.schema';

@Injectable()
export class DriverService implements IDriverService {
  constructor(
    @Inject(DRIVER_REPOSITORY)
    private readonly driverRepository: IDriverRepository,
  ) {}

  async findAll(): Promise<Driver[]> {
    return this.driverRepository.findAll();
  }

  async findById(id: string): Promise<Driver | null> {
    return this.driverRepository.findById(id);
  }

  async create(data: Partial<Driver>): Promise<Driver> {
    return this.driverRepository.create(data);
  }

  async update(id: string, data: Partial<Driver>): Promise<Driver | null> {
    return this.driverRepository.update(id, data);
  }

  async delete(id: string): Promise<boolean> {
    return this.driverRepository.delete(id);
  }
}
