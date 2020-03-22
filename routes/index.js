var express = require("express"),
    router  = express.Router();

router.get("/", function(req, res){
    res.render("index");
});

router.get("/build", function(req, res){
    res.render("build");
});

module.exports = router;