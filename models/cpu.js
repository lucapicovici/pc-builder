var mongoose = require("mongoose");

var cpuSchema = new mongoose.Schema({
    brand: {type: String, required: true},
    name: {type: String, required: true},
    socket: {type: String, required: true},
    frequency: {type: Number, required: true},
    cores: {type: Number, required: true},
    cache: {type: Number, required: true},
    tdp: {type: Number, required: true},
    price: {type: Number, required: true}
});

module.exports = mongoose.model("Cpu", cpuSchema);