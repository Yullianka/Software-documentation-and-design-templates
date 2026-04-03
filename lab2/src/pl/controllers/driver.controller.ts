import { Controller, Get, Post, Put, Delete, Param, Body, Inject } from '@nestjs/common';
import { IDriverService, DRIVER_SERVICE } from '@bll/interfaces/driver-service.interface';

@Controller('api/drivers')
export class DriverController {
  constructor(
    @Inject(DRIVER_SERVICE)
    private readonly driverService: IDriverService,
  ) {}

  @Get()
  async findAll() {
    return this.driverService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.driverService.findById(id);
  }

  @Post()
  async create(@Body() body: { name: string; phone: string; rating: number; licenseNumber: string; status: string; currentLocation: string }) {
    return this.driverService.create(body);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: { name: string; phone: string; rating: number; licenseNumber: string; status: string; currentLocation: string }) {
    return this.driverService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.driverService.delete(id);
  }
}
