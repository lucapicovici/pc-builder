var mongoose = require("mongoose");

var gpuSchema = new mongoose.Schema({
    brand: {type: String, required: true},
    name: {type: String, required: true},
    memory: {type: Number, required: true},
    memoryType: {type: String, required: true},
    coreFrequency: {type: Number, required: true},
    memoryFrequency: {type: Number, required: true},
    sli: {type: Number, required: true},
    crossfire: {type: Number, required: true},
    tdp: {type: Number, required: true},
    price: {type: String, required: true}
});

module.exports = mongoose.model("VideoCard", gpuSchema);