import { IPassenger } from "./passenger.interface";

export interface IFlight extends Document{
    pilot: string;
    airplane: string;
    destinationCity: string;
    flightDate: Date;
    //agregamos los pasajeros que es la coleccion que queremos agregar, e importamos
    passengers: IPassenger[];
}