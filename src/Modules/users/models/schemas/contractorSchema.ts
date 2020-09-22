
// import { IUser } from '../interfaces/IUser';
import mongoose from 'mongoose';

const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

let FinalContratist = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    institution: {
        type: String,
        required: [true, 'Debe indicar el repertorio']
    },
    position: {
        type: String,
        required: [true, 'Debe indicar el cargo del contratista']
    },
    taxID: {
        type: String,
        required: [true, 'Debe indicar una identificación fiscal']
    },
    number: {
        type: String,
        required: [true, 'Debe indicar un numero']
    },
    city: {
        type: String,
        required: [true, 'Debe indicar la ciudad']
    },
    country: {
        type: String,
        required: [true, 'Debe indicar el pais']
    } //pais
});
//exportación del modelo
// module.exports = mongoose.model('FinalContratist', FinalContratist);
