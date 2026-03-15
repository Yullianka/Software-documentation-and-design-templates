import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rating } from '../schemas/rating.schema';
import { IRatingRepository } from '../interfaces/rating-repository.interface';

@Injectable()
export class RatingRepository implements IRatingRepository {
  constructor(
    @InjectModel(Rating.name) private readonly ratingModel: Model<Rating>,
  ) {}

  async findAll(): Promise<Rating[]> {
    return this.ratingModel.find().populate('rideId').exec();
  }

  async findById(id: string): Promise<Rating | null> {
    return this.ratingModel.findById(id).populate('rideId').exec();
  }

  async findByRideId(rideId: string): Promise<Rating[]> {
    return this.ratingModel.find({ rideId }).exec();
  }

  async create(data: Partial<Rating>): Promise<Rating> {
    const rating = new this.ratingModel(data);
    return rating.save();
  }

  async createMany(data: Partial<Rating>[]): Promise<Rating[]> {
    return this.ratingModel.insertMany(data) as unknown as Rating[];
  }

  async update(id: string, data: Partial<Rating>): Promise<Rating | null> {
    return this.ratingModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.ratingModel.findByIdAndDelete(id).exec();
    return result !== null;
  }
}
