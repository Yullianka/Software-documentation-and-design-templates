import { Injectable, Inject } from '@nestjs/common';
import { IRideService } from '../interfaces/ride-service.interface';
import { IRideRepository, RIDE_REPOSITORY } from '@dal/interfaces/ride-repository.interface';
import { Ride } from '@dal/schemas/ride.schema';

@Injectable()
export class RideService implements IRideService {
  constructor(
    @Inject(RIDE_REPOSITORY)
    private readonly rideRepository: IRideRepository,
  ) {}

  async findAll(): Promise<Ride[]> {
    return this.rideRepository.findAll();
  }

  async findById(id: string): Promise<Ride | null> {
    return this.rideRepository.findById(id);
  }

  async create(data: Partial<Ride>): Promise<Ride> {
    return this.rideRepository.create(data);
  }

  async update(id: string, data: Partial<Ride>): Promise<Ride | null> {
    return this.rideRepository.update(id, data);
  }

  async delete(id: string): Promise<boolean> {
    return this.rideRepository.delete(id);
  }
}
