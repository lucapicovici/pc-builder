var mongoose = require("mongoose");

var storageSchema = new mongoose.Schema({
    brand: {type: String, required: true},
    name: {type: String, required: true},
    type: {type: String, required: true},
    capacity: {type: Number, required: true},
    size: {type: Number, required: true},
    cache: {type: Number, required: true},
    spinSpeed: {type: Number, required: true},
    tdp: {type: Number, required: true},
    price: {type: Number, required: true}
});

module.exports = mongoose.model("Storage", storageSchema);