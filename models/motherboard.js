var mongoose = require("mongoose");

var motherboardSchema = new mongoose.Schema({
    brand: {type: String, required: true},
    name: {type: String, required: true},
    form: {type: String, required: true},
    socket: {type: String, required: true},
    memorySlots: {type: Number, required: true},
    maxMemoryFrequency: {type: Number, required: true},
    memoryType: {type: String, required: true},
    sliSupport: {type: Number, required: true},
    crossfireSupport: {type: Number, required: true},
    tdp: {type: Number, required: true},
    price: {type: String, required: true}
});

module.exports = mongoose.model("Motherboard", motherboardSchema);