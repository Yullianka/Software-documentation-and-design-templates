import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Passenger } from '../schemas/passenger.schema';
import { IPassengerRepository } from '../interfaces/passenger-repository.interface';

@Injectable()
export class PassengerRepository implements IPassengerRepository {
  constructor(
    @InjectModel(Passenger.name) private readonly passengerModel: Model<Passenger>,
  ) {}

  async findAll(): Promise<Passenger[]> {
    return this.passengerModel.find().exec();
  }

  async findById(id: string): Promise<Passenger | null> {
    return this.passengerModel.findById(id).exec();
  }

  async findByPhone(phone: string): Promise<Passenger | null> {
    return this.passengerModel.findOne({ phone }).exec();
  }

  async create(data: Partial<Passenger>): Promise<Passenger> {
    const passenger = new this.passengerModel(data);
    return passenger.save();
  }

  async createMany(data: Partial<Passenger>[]): Promise<Passenger[]> {
    return this.passengerModel.insertMany(data) as unknown as Passenger[];
  }

  async update(id: string, data: Partial<Passenger>): Promise<Passenger | null> {
    return this.passengerModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.passengerModel.findByIdAndDelete(id).exec();
    return result !== null;
  }
}
