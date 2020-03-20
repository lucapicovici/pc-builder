var express    = require("express"),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    app        = express();

var indexRoutes = require("./routes/index.js");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

mongoose.set("useUnifiedTopology", true);
mongoose.set("useNewUrlParser", true);
mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb://localhost/pc-builder");

app.use("/", indexRoutes);

app.listen(3000, () => {
    console.log("pc-builder server is now listening on port 3000.");
});