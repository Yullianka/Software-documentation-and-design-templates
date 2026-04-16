import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Driver } from '../schemas/driver.schema';
import { IDriverRepository } from '../interfaces/driver-repository.interface';

@Injectable()
export class DriverRepository implements IDriverRepository {
  constructor(
    @InjectModel(Driver.name) private readonly driverModel: Model<Driver>,
  ) {}

  async findAll(): Promise<Driver[]> {
    return this.driverModel.find().exec();
  }

  async findById(id: string): Promise<Driver | null> {
    return this.driverModel.findById(id).exec();
  }

  async findByLicenseNumber(licenseNumber: string): Promise<Driver | null> {
    return this.driverModel.findOne({ licenseNumber }).exec();
  }

  async create(data: Partial<Driver>): Promise<Driver> {
    const driver = new this.driverModel(data);
    return driver.save();
  }

  async createMany(data: Partial<Driver>[]): Promise<Driver[]> {
    return this.driverModel.insertMany(data) as unknown as Driver[];
  }

  async update(id: string, data: Partial<Driver>): Promise<Driver | null> {
    return this.driverModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.driverModel.findByIdAndDelete(id).exec();
    return result !== null;
  }
}
