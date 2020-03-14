const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
    data: {
        type: Array,
        required: false,
        minlength: 0,
    }
})

const Vehicle = mongoose.model('Vehicle', VehicleSchema);

module.exports = { Vehicle }
