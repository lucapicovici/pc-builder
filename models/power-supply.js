var mongoose = require("mongoose");

var powerSupplySchema = new mongoose.Schema({
    brand: {type: String, required: true},
    name: {type: String, required: true},
    rating: {type: String, required: true},
    fanSize: {type: Number, required: true},
    tdp: {type: Number, required: true},
    price: {type: String, required: true}
});

module.exports = mongoose.model("PowerSupply", powerSupplySchema);