
import mongoose from 'mongoose';
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;
const _repertorio = new Schema({
    composer: {
        type: String,
        required: [true, 'Debe indicar el compositor']
    },
    role: {
        type: String,
        required: [true, 'Debe indicar el rol']
    },
    title: {
        type: String,
        required: [true, 'Debe indicar el titulo']
    },
    tone: {
        type: String,
        require: [true, 'Debe indicar la tonalidad']
    } //tono del cantante
});
const SingerArtist = new Schema({
    // user:
    // {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User'
    // },//usuario
    voiceType: {
        type: Array,
        required: [true, 'Debe indicar el tipo de voz']
    },
    speciality: {
        type: Array,
        required: [true, 'Debe indicar la especialidad']
    },
    _repertorios: _repertorio
});
//exportación del modelo
// module.exports = mongoose.model('SingerArtist', SingerArtist);
