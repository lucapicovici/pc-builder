var express    = require("express"),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    seedDB     = require("./seeds.js"),
    session    = require("express-session"),
    mongoStore = require("connect-mongo")(session),
    app        = express();

var indexRoutes = require("./routes/index.js"),
    productRoutes = require("./routes/products.js");

var Cart = require("./models/cart.js");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

mongoose.set("useUnifiedTopology", true);
mongoose.set("useNewUrlParser", true);
mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb://localhost/pc-builder");
seedDB();

app.use(session({
    secret: "Fender makes really cool guitars",
    resave: false,
    saveUninitialized: false,
    store: new mongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 180 * 60 * 1000 }
}));
app.use(function(req, res, next){
    req.session.cart = new Cart(req.session.cart ? req.session.cart : {items: {}});
    next();
});

app.use("/", indexRoutes);
app.use("/products", productRoutes);

app.listen(3000, () => {
    console.log("pc-builder server is now listening on port 3000.");
});