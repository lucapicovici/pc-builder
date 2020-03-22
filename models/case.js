var mongoose = require("mongoose");

var caseSchema = new mongoose.Schema({
    brand: {type: String, required: true},
    name: {type: String, required: true},
    form: {type: String, required: true},
    motherboardSupport: {type: String, required: true},
    maxGpuLength: {type: Number, required: true},
    maxCoolerHeight: {type: Number, required: true},
    maxPsuLength: {type: Number, required: true},
    price: {type: Number, required: true}
});

module.exports = mongoose.model("Case", caseSchema);