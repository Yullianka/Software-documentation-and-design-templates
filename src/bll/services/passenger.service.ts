import { Injectable, Inject } from '@nestjs/common';
import { IPassengerService } from '../interfaces/passenger-service.interface';
import { IPassengerRepository, PASSENGER_REPOSITORY } from '@dal/interfaces/passenger-repository.interface';
import { Passenger } from '@dal/schemas/passenger.schema';

@Injectable()
export class PassengerService implements IPassengerService {
  constructor(
    @Inject(PASSENGER_REPOSITORY)
    private readonly passengerRepository: IPassengerRepository,
  ) {}

  async findAll(): Promise<Passenger[]> {
    return this.passengerRepository.findAll();
  }

  async findById(id: string): Promise<Passenger | null> {
    return this.passengerRepository.findById(id);
  }

  async create(data: Partial<Passenger>): Promise<Passenger> {
    return this.passengerRepository.create(data);
  }

  async update(id: string, data: Partial<Passenger>): Promise<Passenger | null> {
    return this.passengerRepository.update(id, data);
  }

  async delete(id: string): Promise<boolean> {
    return this.passengerRepository.delete(id);
  }
}
