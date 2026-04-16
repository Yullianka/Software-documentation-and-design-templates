import { Payment } from '../../dal/schemas/payment.schema';

export interface IPaymentController {
  findAll(): Promise<Payment[]>;
  findById(id: string): Promise<Payment | null>;
  create(data: Partial<Payment>): Promise<Payment>;
  update(id: string, data: Partial<Payment>): Promise<Payment | null>;
  delete(id: string): Promise<boolean>;
}
