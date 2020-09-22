
import mongoose from 'mongoose';
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;
const ArtistStageDirector = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    artisticName: {
        type: String,
        required: false,
        default: null
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
// module.exports = mongoose.model('ArtistStageDirector', ArtistStageDirector);
