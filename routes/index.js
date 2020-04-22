var express  = require("express"),
passport = require("passport"),
router   = express.Router();

router.get("/", function(req, res){
    res.render("index");
});

router.get("/build", function(req, res){
    res.render("build", {cart: req.session.cart});
});

router.get("/user/profile", isLoggedIn, function(req, res){
    res.render("user/profile");
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

module.exports = router;