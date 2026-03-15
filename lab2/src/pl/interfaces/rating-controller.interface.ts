import { Rating } from '../../dal/schemas/rating.schema';

export interface IRatingController {
  findAll(): Promise<Rating[]>;
  findById(id: string): Promise<Rating | null>;
  create(data: Partial<Rating>): Promise<Rating>;
  update(id: string, data: Partial<Rating>): Promise<Rating | null>;
  delete(id: string): Promise<boolean>;
}
