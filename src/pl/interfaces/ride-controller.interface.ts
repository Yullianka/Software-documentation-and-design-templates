import { Ride } from '../../dal/schemas/ride.schema';

export interface IRideController {
  findAll(): Promise<Ride[]>;
  findById(id: string): Promise<Ride | null>;
  create(data: Partial<Ride>): Promise<Ride>;
  update(id: string, data: Partial<Ride>): Promise<Ride | null>;
  delete(id: string): Promise<boolean>;
}
