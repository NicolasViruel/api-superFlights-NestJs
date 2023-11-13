import { Module } from '@nestjs/common';
import { PassengerController } from './passenger.controller';
import { PassengerService } from './passenger.service';
import { PASSENGER } from 'src/common/models/model';
import { PassengerSchema } from './schema/passenger.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name:PASSENGER.name,
        useFactory: () => PassengerSchema,
      },
    ]),
  ],
  controllers: [PassengerController],
  providers: [PassengerService],
  //exportamos el servicio de pasajeros para agregar en los vuelos
  exports:[PassengerService]
})
export class PassengerModule {}
