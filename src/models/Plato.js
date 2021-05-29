const mongoose = require('mongoose');
const { Schema } = mongoose;

const PlatoSchema = new Schema({
    restaurante: { type: String, required: true},
    plato: { type: String, required: true},
    cantidad: { type: String, required: true},
    direccion: { type: String, required: true},
    telefono: { type: String, required: true},
    date: { type: Date, default: Date.now}
});

module.exports = mongoose.model('Plato', PlatoSchema);