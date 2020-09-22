import mongoose from 'mongoose';
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;
const voiceType = new Schema({
    // user:
    // {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User'
    // },//usuario
    voiceType: {
        type: String,
        required: [true, 'Debe indicar el tipo de voz']
    },
});
//exportación del modelo
module.exports = mongoose.model('voiceType', voiceType);
