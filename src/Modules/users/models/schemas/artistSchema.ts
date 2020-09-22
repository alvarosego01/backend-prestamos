import mongoose from 'mongoose';
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const _bankSchema = new Schema({
    bank: {
        type: String,
        required: [true, 'Debe proporcionar un banco'],
    },
    bankNumber: {
        type: String,
        required: [true, 'Debe proporcionar un número bancario'],
    },
    specs: {
        type: Array,
        required: [false, 'Debe proporcionar unas especificaciones'],
    },
    adress: {
        type: String,
        required: [true, 'Debe proporcionar una dirección'],
    },
});
const fiscalDirection = new Schema({
    // empresa:
    // {
    //     type       :String,
    //     required   :[true, 'Debe proporcionar nombre de la empresa'],
    // },//nombre de la empresa
    fiscalAddress: {
        type: String,
        required: [true, 'Debe proporcionar una dirección fiscal'],
    },
    fiscalAddressNumber: {
        type: String,
        required: [true, 'Debe proporcionar un codigo postal'],
    },
    postalCode: {
        type: String,
        required: [true, 'Debe proporcionar un codigo postal'],
    },
    city: {
        type: String,
        required: [true, 'Debe proporcionar una ciudad'],
    },
    country: {
        type: String,
        required: [true, 'Debe proporcionar un país'],
    },
    fiscalDocumentNumber: {
        type: String,
        required: [true, 'Debe proporcionar una número de documento fiscal'],
    },
    passport: {
        type: String,
        required: [true, 'Debe proporcionar un número de pasaporte'],
    },
    email: {
        type: String,
        required: [true, 'Debe proporcionar un email'],
    },
}); //contrato de la pagina
const userBiography = new Schema({
    biography: {
        type: String,
        required: [true, 'Debe proporcionar una Biografia'],
    },
    biography_lite: {
        type: String,
        required: [true, 'Debe proporcionar una Biografia resumida'],
    },
    biography_full: {
        type: String,
        required: [true, 'Debe proporcionar una Biografia completa'],
    },
}); //biografia del usuario
// export default mongoose.model('', User);
