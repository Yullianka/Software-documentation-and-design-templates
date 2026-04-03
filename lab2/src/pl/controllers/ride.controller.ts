import { Controller, Get, Post, Put, Delete, Param, Body, Inject } from '@nestjs/common';
import { IRideService, RIDE_SERVICE } from '@bll/interfaces/ride-service.interface';

@Controller('api/rides')
export class RideController {
  constructor(
    @Inject(RIDE_SERVICE)
    private readonly rideService: IRideService,
  ) {}

  @Get()
  async findAll() {
    return this.rideService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.rideService.findById(id);
  }

  @Post()
  async create(@Body() body: { passengerId: string; driverId: string; startPoint: string; destination: string; price: number; status: string }) {
    return this.rideService.create(body as any);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: { passengerId: string; driverId: string; startPoint: string; destination: string; price: number; status: string }) {
    return this.rideService.update(id, body as any);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.rideService.delete(id);
  }
}
