var express    = require("express"),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    seedDB     = require("./seeds.js"),
    app        = express();

var indexRoutes = require("./routes/index.js"),
    productRoutes = require("./routes/products.js");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

mongoose.set("useUnifiedTopology", true);
mongoose.set("useNewUrlParser", true);
mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb://localhost/pc-builder");
seedDB();

app.use("/", indexRoutes);
app.use("/products", productRoutes);

app.listen(3000, () => {
    console.log("pc-builder server is now listening on port 3000.");
});