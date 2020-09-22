
import mongoose from 'mongoose';
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;
const InstrumentalistArtist = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    instrument: {
        type: Array,
        required: [true, 'Debe indicar el instrumento']
    },
    windInstrument: {
        type: Array,
        required: false
    },
    woodWindInstrument: {
        type: Array,
        required: false
    },
    melodicWoodWind: {
        type: Array,
        required: false,
    },
    woodWindSaxo: {
        type: Array,
        required: false
    },
    typeMetalWind: {
        type: Array,
        required: false
    },
    percussionType: {
        type: Array,
        required: false
    },
    stringType: {
        type: Array,
        required: false
    },
    electricType: {
        type: Array,
        required: false
    },
    positionAIN: {
        type: Boolean,
        required: [true, 'Debe indicar la pisición']
    },
    specialityAIN: {
        type: Boolean,
        required: [true, 'Debe indicar si posee la especialidad']
    } //especialidad-AIN
});
//exportación del modelo
// module.exports = mongoose.model('InstrumentalistArtist', InstrumentalistArtist);
