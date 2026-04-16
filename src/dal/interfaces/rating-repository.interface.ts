import { IRepository } from './repository.interface';
import { Rating } from '../schemas/rating.schema';

export interface IRatingRepository extends IRepository<Rating> {
  findByRideId(rideId: string): Promise<Rating[]>;
}

export const RATING_REPOSITORY = 'RATING_REPOSITORY';
