import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { FlightService } from './flight.service';

@Controller('flight')
export class FlightController {
  constructor(private readonly flightService:FlightService) {}

  // GET /flights?service=direct
  @Get()
  getFlights(@Query('service') service: string) {
    return this.flightService.getFlights(service)
  }

  // GET /flights/:id
  @Get(':id')
  getOneFlight(@Param('id') id: string) {
    return this.flightService.getFlight(+id)
  }

  // POST /flight/:id
  @Post()
  createFlight(@Body() createFlightDto: CreateFlightDto) {
    return this.flightService.createFlight(createFlightDto)
  }

  // PUT /flight/:id
  @Put(':id')
  updateFlight(@Param('id') id: string, @Body() updateFlightDto: UpdateFlightDto) {
    return this.flightService.updateFlight(+id, updateFlightDto)
  }

  // DELETE /flight/:id
  @Delete(':id')
  deleteFlight(@Param('id') id: string) {
    return this.flightService.removeFlight(+id)
  }
}