import { IRepository } from './repository.interface';
import { Payment } from '../schemas/payment.schema';

export interface IPaymentRepository extends IRepository<Payment> {
  findByRideId(rideId: string): Promise<Payment | null>;
}

export const PAYMENT_REPOSITORY = 'PAYMENT_REPOSITORY';
