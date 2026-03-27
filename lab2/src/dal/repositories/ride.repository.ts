import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ride } from '../schemas/ride.schema';
import { IRideRepository } from '../interfaces/ride-repository.interface';

@Injectable()
export class RideRepository implements IRideRepository {
  constructor(
    @InjectModel(Ride.name) private readonly rideModel: Model<Ride>,
  ) {}

  async findAll(): Promise<Ride[]> {
    return this.rideModel.find().populate('passengerId').populate('driverId').exec();
  }

  async findById(id: string): Promise<Ride | null> {
    return this.rideModel.findById(id).populate('passengerId').populate('driverId').exec();
  }

  async findByPassengerId(passengerId: string): Promise<Ride[]> {
    return this.rideModel.find({ passengerId }).exec();
  }

  async findByDriverId(driverId: string): Promise<Ride[]> {
    return this.rideModel.find({ driverId }).exec();
  }

  async findByStatus(status: string): Promise<Ride[]> {
    return this.rideModel.find({ status }).exec();
  }

  async create(data: Partial<Ride>): Promise<Ride> {
    const ride = new this.rideModel(data);
    return ride.save();
  }

  async createMany(data: Partial<Ride>[]): Promise<Ride[]> {
    return this.rideModel.insertMany(data) as unknown as Ride[];
  }

  async update(id: string, data: Partial<Ride>): Promise<Ride | null> {
    return this.rideModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.rideModel.findByIdAndDelete(id).exec();
    return result !== null;
  }
}
