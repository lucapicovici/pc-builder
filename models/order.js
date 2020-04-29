var mongoose = require("mongoose");

var orderSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    cart: {type: Object, required: true}
});

module.exports = mongoose.model("Order", orderSchema);