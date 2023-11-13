import { Controller, Post, Body, Get, Param, Put, Delete, HttpException, HttpStatus, UseGuards  } from '@nestjs/common';
import { FlightService } from './flight.service';
import { FlightDTO } from './dto/flight.dto';
import { PassengerService } from 'src/passenger/passenger.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('flights')
@Controller('/api/v1/flight')
export class FlightController {
    constructor (private readonly flightService:FlightService,
        private readonly passengerService:PassengerService) {} //inyectamos el servicio de pasajeros

    @Post()
    @ApiOperation({ summary: 'Create Flight'})
    create(@Body() flightDTO:FlightDTO){
        return this.flightService.create(flightDTO);
    }

    @Get()
    @ApiOperation({ summary: 'Get Flights'})
    findAll(){
        return this.flightService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get One Flight'})
    findOne(@Param('id') id:string){
        return this.flightService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Updatete Flight'})
    update(@Param('id') id:string, @Body() flightDTO:FlightDTO){
        return this.flightService.update(id, flightDTO);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete Flight'})
    delete(@Param('id') id:string){
        return this.flightService.delete(id)
    }

    //crear Pasajeros combinado con los vuelos
    // @Post(':flightId/passenger/:passengerId')
    // async addPassenger(@Param('flightId')flightID: string , @Param('passengerId')passengerId: string)
    // {
    //     //previamente debemos inyectar el servicio de pasajeros
    //     const passenger = await this.passengerService.findOne(passengerId);
        
    //     //si el pasajero no existe que devuelva un error
    //     if (!passenger)
    //     throw new HttpException('Passenger Not Found', HttpStatus.NOT_FOUND);
    //     return this.flightService.addPassenger(flightID,passengerId);
    // }
    @Post(':flightId/passenger/:passengerId')
    async addPassenger(@Param('flightId') flightID: string, @Param('passengerId') passengerId: string) {
    try {
        const passenger = await this.passengerService.findOne(passengerId);
        if (!passenger) {
            throw new HttpException('Passenger Not Found', HttpStatus.NOT_FOUND);
        }
        const updatedFlight = await this.flightService.addPassenger(flightID, passengerId);
        return updatedFlight;
    } catch (error) {
        console.log(error)
        throw new HttpException('Failed to add passenger to flight', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
}
