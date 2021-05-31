const mongoose = require('mongoose');
const { Schema } = mongoose;

const PlatoSchema = new Schema({
    restaurante: { type: String, required: true},
    plato: { type: String, required: true},
    cantidad: { type: Number, required: true},
    direccion: { type: String, required: true},
    telefono: { type: Number, required: true},
    date: { type: Date, default: Date.now},
    user: { type: String}
});

module.exports = mongoose.model('Plato', PlatoSchema);