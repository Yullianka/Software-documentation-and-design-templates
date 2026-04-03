import { Controller, Get, Post, Put, Delete, Param, Body, Inject } from '@nestjs/common';
import { IPassengerService, PASSENGER_SERVICE } from '@bll/interfaces/passenger-service.interface';

@Controller('api/passengers')
export class PassengerController {
  constructor(
    @Inject(PASSENGER_SERVICE)
    private readonly passengerService: IPassengerService,
  ) {}

  @Get()
  async findAll() {
    return this.passengerService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.passengerService.findById(id);
  }

  @Post()
  async create(@Body() body: { name: string; phone: string; rating: number; paymentMethod: string }) {
    return this.passengerService.create(body);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: { name: string; phone: string; rating: number; paymentMethod: string }) {
    return this.passengerService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.passengerService.delete(id);
  }
}
