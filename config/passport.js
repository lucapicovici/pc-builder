var passport      = require("passport"),
    localStrategy = require("passport-local");

var User = require("../models/user.js");

// serializeUser
passport.serializeUser(function(user, done){
    done(null, user.id);
});

// deserializeUser
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if (err) {
            console.log(err);
        } else {
            done(err, user);
        }
    });
});

// register strategy
passport.use("local.register", new localStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, function(req, email, password, done){
    // Field validations
    req.checkBody("email", "Invalid email").notEmpty().isEmail();
    req.checkBody("password", "Invalid password").notEmpty().isLength({min:4});
    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach(function(error){
            messages.push(error.msg);
        });
        return done(null, false, req.flash("error", messages));
    }

    // Check if user already exists
    User.findOne({"email": email}, function(err, user){
        if (err) {
            return done(err);
        }
        if (user) {
            return done(null, false, {message: "Email is already in use."});
        }
        // Save user
        var newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);

        newUser.save(function(err, user){
            if (err) {
                return done(err);
            }
            return done(null, user);
        });
    });
}));

// login strategy 
passport.use("local.login", new localStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, function(req, email, password, done){
    // Field validations
    req.checkBody("email", "Invalid email or password").notEmpty().isEmail();
    req.checkBody("password", "Invalid email or password").notEmpty().isLength({min:4});
    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach(function(error){
            messages.push(error.msg);
        });
        return done(null, false, req.flash("error", messages));
    }

    // Check if user already exists
    User.findOne({"email": email}, function(err, user){
        if (err) {
            return done(err);
        }
        if (!user || !user.validPassword(password)) {
            return done(null, false, {message: "Invalid email or password."});
        }
        return done(null, user);
    });
}));