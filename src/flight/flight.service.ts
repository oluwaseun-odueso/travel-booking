import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';

@Injectable()
export class FlightService {
  private flights = [
    {id: 0, name: "Tola", class: "economy", flight: "Air Peace"},
    {id: 1, name: "Bola", class: "business", flight: "Arik Air"},
    {id: 2, name: "Sola", class: "vvip", flight: "Dana Airline"}
  ]

  getFlights (service?: 'business' | 'economy' | 'vvip') {
    if (service) {
      return this.flights.filter((flight) => flight.class === service)
    }

    return this.flights
  }

  getFlight (id: number) {
    try {
      const flight = this.flights.find((flight) => flight.id === id)
      if (!flight) {
        throw new Error("flight not found")
      }
      return flight
    } catch (error) {
      throw new NotFoundException();
    }
  }

  createFlight (createFlightDto: CreateFlightDto) {
    const newFlight = {
      ...createFlightDto,
      id: Date.now()
    }
    
    this.flights.push(newFlight)
    return newFlight
  }

  updateFlight(id: number, updateFlightDto: UpdateFlightDto) {
    this.flights = this.flights.map((flight) => {
      if(flight.id === id) {
        return {...flight, ...updateFlightDto}
      } 
      
      return flight
    })
    return this.getFlight(id)
  }

  removeFlight(id: number) {
    const toBeRemoved = this.getFlight(id)

    this.flights = this.flights.filter((flight) => flight.id !== id)
    return toBeRemoved
  }
}
