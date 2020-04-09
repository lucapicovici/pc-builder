var mongoose = require("mongoose");

var memorySchema = new mongoose.Schema({
    brand: {type: String, required: true},
    name: {type: String, required: true},
    capacity: {type: Number, required: true},
    frequency: {type: Number, required: true},
    type: {type: String, required: true},
    tdp: {type: Number, required: true},
    price: {type: Number, required: true}
});

module.exports = mongoose.model("Memory", memorySchema);