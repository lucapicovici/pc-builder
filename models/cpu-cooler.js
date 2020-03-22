var mongoose = require("mongoose");

var cpuCoolerSchema = new mongoose.Schema({
    brand: {type: String, required: true},
    name: {type: String, required: true},
    type: {type: String, required: true},
    fanSize: {type: Number, required: true},
    tdp: {type: Number, required: true},
    price: {type: Number, required: true}
});

module.exports = mongoose.model("CpuCooler", cpuCoolerSchema);