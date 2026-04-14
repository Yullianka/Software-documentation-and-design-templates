import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Car } from '../schemas/car.schema';
import { ICarRepository } from '../interfaces/car-repository.interface';

@Injectable()
export class CarRepository implements ICarRepository {
  constructor(
    @InjectModel(Car.name) private readonly carModel: Model<Car>,
  ) {}

  async findAll(): Promise<Car[]> {
    return this.carModel.find().populate('driverId').exec();
  }

  async findById(id: string): Promise<Car | null> {
    return this.carModel.findById(id).populate('driverId').exec();
  }

  async findByPlateNumber(plateNumber: string): Promise<Car | null> {
    return this.carModel.findOne({ plateNumber }).exec();
  }

  async create(data: Partial<Car>): Promise<Car> {
    const car = new this.carModel(data);
    return car.save();
  }

  async createMany(data: Partial<Car>[]): Promise<Car[]> {
    return this.carModel.insertMany(data) as unknown as Car[];
  }

  async update(id: string, data: Partial<Car>): Promise<Car | null> {
    return this.carModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.carModel.findByIdAndDelete(id).exec();
    return result !== null;
  }
}
