import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards  } from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { PassengerDTO } from './dto/passenger.dto';
import { ApiTags, ApiOperation, ApiBearerAuth  } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('passengers')
@Controller('api/v1/passenger')
export class PassengerController {
    //inyectamos nuestro servicio
    constructor (private readonly passengerService: PassengerService) {}

    @Post()
    @ApiOperation({ summary: 'Create Passenger'})
    create(@Body() passengerDTO: PassengerDTO){
        return this.passengerService.create(passengerDTO);
    }

    @Get()
    @ApiOperation({ summary: 'Get Passengers'})
    findAll(){
        return this.passengerService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get One Passenger'})
    findOne(@Param('id') id:string){
        return this.passengerService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update Passenger'})
    update(@Param('id') id:string, @Body() passengerDTO:PassengerDTO){
        return this.passengerService.update(id, passengerDTO);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete Passenger'})
    delete(@Param('id') id:string){
        return this.passengerService.delete(id);
    }

}
