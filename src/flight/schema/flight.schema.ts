// import * as mongoose from 'mongoose'

// export const FlightSchema = new mongoose.Schema({
//     //los Valores van con la primera en Mayuscula
//     pilot: {type: String, required: true},
//     airplane: {type: String, required: true},
//     destinationCity: {type: String, required: true},
//     flightDate: {type: Date, required: true},
//     passengers: [{type:mongoose.Schema.Types.ObjectId, //De esta manera almacenaremos nuestros pajajeros y los vuelos
//         ref: 'passengers'
//     }],
// },
//     {timestamps: true});

import * as mongoose from 'mongoose';

export const FlightSchema = new mongoose.Schema({
    pilot: { type: mongoose.Schema.Types.String, required: true },
    airplane: { type: mongoose.Schema.Types.String, required: true },
    destinationCity: { type: mongoose.Schema.Types.String, required: true },
    flightDate: { type: mongoose.Schema.Types.Date, required: true },
    passengers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'passengers'
    }],
}, { timestamps: true });



