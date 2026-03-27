import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment } from '../schemas/payment.schema';
import { IPaymentRepository } from '../interfaces/payment-repository.interface';

@Injectable()
export class PaymentRepository implements IPaymentRepository {
  constructor(
    @InjectModel(Payment.name) private readonly paymentModel: Model<Payment>,
  ) {}

  async findAll(): Promise<Payment[]> {
    return this.paymentModel.find().populate('rideId').exec();
  }

  async findById(id: string): Promise<Payment | null> {
    return this.paymentModel.findById(id).populate('rideId').exec();
  }

  async findByRideId(rideId: string): Promise<Payment | null> {
    return this.paymentModel.findOne({ rideId }).exec();
  }

  async create(data: Partial<Payment>): Promise<Payment> {
    const payment = new this.paymentModel(data);
    return payment.save();
  }

  async createMany(data: Partial<Payment>[]): Promise<Payment[]> {
    return this.paymentModel.insertMany(data) as unknown as Payment[];
  }

  async update(id: string, data: Partial<Payment>): Promise<Payment | null> {
    return this.paymentModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.paymentModel.findByIdAndDelete(id).exec();
    return result !== null;
  }
}
