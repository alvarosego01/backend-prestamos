
import mongoose from 'mongoose';
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;
const ConductorArtist = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    repertoire: {
        type: Array,
        required: [true, 'Debe indicar el repertorio']
    },
    speciality: {
        type: Array,
        required: [true, 'Debe indicar la especialidad']
    } //especialidad
});
//exportación del modelo
// module.exports = mongoose.model('ConductorArtist', ConductorArtist);
//
