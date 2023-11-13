import { Injectable, HttpStatus } from '@nestjs/common';
import { FLIGHT } from '../common/models/model'
import { Model } from 'mongoose';
import { IFlight } from 'src/common/interface/flight.interface';
import { InjectModel } from '@nestjs/mongoose';
import { FlightDTO } from './dto/flight.dto';


@Injectable()
export class FlightService {
    constructor(
        @InjectModel(FLIGHT.name)
        private readonly model:Model<IFlight>
    ){}

    async create(flightDTO:FlightDTO) : Promise<IFlight>{
        const newFlight = new this.model(flightDTO);
        return await newFlight.save();
    }

    async findAll() : Promise<IFlight[]>{
        return await this.model.find().populate('passengers');
    }

    async findOne(id:string) : Promise<IFlight>{
        return await this.model.findById(id).populate('passengers');
    }

    async update(id:string, flightDTO:FlightDTO) : Promise<IFlight>{
        return await this.model.findByIdAndUpdate(id, flightDTO, { new: true });
    }

    async delete(id:string){
        await this.model.findByIdAndDelete(id);
        return{
            status: HttpStatus.OK,
            msg: 'Deleted',
        };
    }

    // metodo para agregar pasajeros en los vuelos
    async addPassenger(flightId:string, passengerId:string) : Promise<IFlight>{
        return await this.model.findByIdAndUpdate(flightId,
            {
                $addToSet:{ passengers : passengerId},
            },
            { new: true},
            ).populate('passengers');
    }

}
