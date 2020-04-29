var express  = require("express"),
    passport = require("passport"),
    router   = express.Router();

var Order = require("../models/order.js");

router.get("/", function(req, res){
    res.redirect("/build");
    // res.render("index");
});

router.get("/build", function(req, res){
    res.render("build", {cart: req.session.cart, successMessages: req.flash("success")});
});

router.post("/build", isLoggedIn, function(req, res){
    if (isEmpty(req.session.cart.items)) {
        return res.redirect("/build");
    }
    // Get the cart
    var cart = req.session.cart;
    // Create an order model
    var order = new Order({
        user: req.user,
        cart: cart
    });
    // Save the order object in DB
    order.save(function(err, order){
        if (err) {
            console.log(err);
        } else {
            req.flash("success", "Order has been placed successfully.");
            req.session.cart = null;
            res.redirect("/");
        }
    });
});

router.get("/user/profile", isLoggedIn, function(req, res){
    res.render("user/profile");
});

router.get("/user/orders", isLoggedIn, function(req, res){
    Order.find({user: req.user}, function(err, orders){
        if (err) {
            return res.write("Error!");
        }
        res.render("user/orders/index", {orders: orders});
    });
});

router.get("/user/orders/:id", isLoggedIn, function(req, res){
    Order.findById(req.params.id, function(err, order){
        if (err) {
            return res.write("Error!");
        }
        res.render("user/orders/show", {order: order});
    });
});

router.get("/user/logout", isLoggedIn, function(req, res){
    req.logout();
    res.redirect("/");
});

router.use("/", notLoggedIn, function(req, res, next){
    next();
});

router.get("/user/register", function(req, res){
    var errMessages = req.flash("error");
    res.render("user/register", {errMessages: errMessages});
});

router.post("/user/register", passport.authenticate("local.register", {
    successRedirect: "/",
    failureRedirect: "/user/register",
    failureFlash: true
}), function(req, res){
});

router.get("/user/login", function(req, res){
    var errMessages = req.flash("error");
    res.render("user/login", {errMessages: errMessages});
});

router.post("/user/login", passport.authenticate("local.login", {
    successRedirect: "/",
    failureRedirect: "/user/login",
    failureFlash: true
}), function(req, res){
});


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
};

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
};

function isEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) return false;
    }
    return true;
}

module.exports = router;