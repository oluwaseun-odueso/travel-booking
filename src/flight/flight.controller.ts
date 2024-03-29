import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { FlightService } from './flight.service';

@Controller('flight')
export class FlightController {
  constructor(private readonly flightService:FlightService) {}

  // GET /flights?service=direct
  @Get()
  getFlights(@Query('classType') classType: 'business' | 'economy' | 'vvip') {
    return this.flightService.getFlights(classType)
  }

  // GET /flights/:id
  @Get(':id')
  getOneFlight(@Param('id', ParseIntPipe) id: number) {
    return this.flightService.getFlight(id)
  }

  // POST /flight/:id
  @Post()
  createFlight(@Body(new ValidationPipe()) createFlightDto: CreateFlightDto) { 
    return this.flightService.createFlight(createFlightDto)
  }

  // PUT /flight/:id
  @Put(':id')
  updateFlight(@Param('id', ParseIntPipe) id: number, @Body() updateFlightDto: UpdateFlightDto) {
    return this.flightService.updateFlight(id, updateFlightDto)
  }

  // DELETE /flight/:id
  @Delete(':id')
  deleteFlight(@Param('id') id: string) {
    return this.flightService.removeFlight(+id)
  }
}