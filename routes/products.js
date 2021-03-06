var express = require("express"),
    url     = require("url"),
    router  = express.Router();

var Cpu = require("../models/cpu.js"),
    CpuCooler  = require("../models/cpu-cooler.js"),
    Motherboard = require("../models/motherboard.js"),
    Memory = require("../models/memory.js"),
    VideoCard = require("../models/video-card.js"),
    Storage = require("../models/storage.js"),
    Case = require("../models/case.js"),
    PowerSupply = require("../models/power-supply.js"),
    Cart    = require("../models/cart.js");

router.get("/", function(req, res){
    res.send("Products page.");
});

router.get("/cpu", function(req, res){
    var cart = req.session.cart.items;
    var filter = req.query.filter;
    var query = {};
    var totalTdp = req.session.cart.totalTdp;

    if (cart.motherboard) query.socket = cart.motherboard.item.socket;
    if (cart["power-supply"]) {
        query["$expr"] = {
            $lte: [
                {$add: ["$tdp", totalTdp]},
                cart["power-supply"].item.tdp
            ]
        }
    }
    if (filter === "all") query = {};

    Cpu.find(query, function(err, cpuItems){
        if (err) {
            console.log(err);
        } else {
            res.render("products/cpu/index", {cpuItems: cpuItems});
        }
    });
});

router.get("/cpu/:id", function(req, res){
    cpuId = req.params.id;
    Cpu.findById(cpuId, function(err, cpu){
        if (err) {
            console.log(err);
        } else {
            res.render("products/cpu/show", {cpu: cpu});
        }
    });
});

router.get("/cpu-cooler", function(req, res){
    var cart = req.session.cart.items;
    var filter = req.query.filter;
    var query = {};
    var totalTdp = req.session.cart.totalTdp;

    if (cart["power-supply"]) {
        query["$expr"] = {
            $lte: [
                {$add: ["$tdp", totalTdp]},
                cart["power-supply"].item.tdp
            ]
        }
    }
    if (filter === "all") query = {};

    CpuCooler.find(query, function(err, cpuCoolerItems){
        if (err) {
            console.log(err);
        } else {
            res.render("products/cpu-cooler/index", {cpuCoolerItems: cpuCoolerItems});
        }
    });
});

router.get("/cpu-cooler/:id", function(req, res){
    cpuCoolerId = req.params.id;
    CpuCooler.findById(cpuCoolerId, function(err, cpuCooler){
        if (err) {
            console.log(err);
        } else {
            res.render("products/cpu-cooler/show", {cpuCooler: cpuCooler});
        }
    });
});

router.get("/motherboard", function(req, res){
    var cart = req.session.cart.items;
    var filter = req.query.filter;
    var query = {};
    var totalTdp = req.session.cart.totalTdp;

    if (cart.cpu) query.socket = cart.cpu.item.socket;
    if (cart.memory) {
        query.maxMemory = {$gte: cart.memory.item.capacity};
        query.maxMemoryFrequency = {$gte: cart.memory.item.frequency};
        query.memoryType = cart.memory.item.type;
    }
    if (cart["power-supply"]) {
        query["$expr"] = {
            $and: [
                {
                    $lte: [
                        {$add: ["$tdp", totalTdp]},
                        cart["power-supply"].item.tdp
                    ]
                }
            ]
        }
        if (cart["video-card"]) {
            query["$expr"]["$and"].push(
                {
                    $gte: [
                        "$sliSupport",
                        cart["video-card"].item.sli
                    ]
                },
                {
                    $gte: [
                        "$crossfireSupport",
                        cart["video-card"].item.crossfire
                    ]
                }
            )
        }
    } else if (cart["video-card"]) {
        query["$expr"] = {
            $and: [
                {
                    $gte: [
                        "$sliSupport",
                        cart["video-card"].item.sli
                    ]
                },
                {
                    $gte: [
                        "$crossfireSupport",
                        cart["video-card"].item.crossfire
                    ]
                }
            ]
        }
    }
    if (filter === "all") query = {};

    Motherboard.find(query, function(err, motherboardItems){
        if (err) {
            console.log(err);
        } else {
            res.render("products/motherboard/index", {motherboardItems: motherboardItems});
        }
    });
});

router.get("/motherboard/:id", function(req, res){
    motherboardId = req.params.id;
    Motherboard.findById(motherboardId, function(err, motherboard){
        if (err) {
            console.log(err);
        } else {
            res.render("products/motherboard/show", {motherboard: motherboard});
        }
    });
});

router.get("/memory", function(req, res){
    var cart = req.session.cart.items;
    var filter = req.query.filter;
    var query = {};
    var totalTdp = req.session.cart.totalTdp;

    if (cart.motherboard) {
        query.capacity = {$lte: cart.motherboard.item.maxMemory};
        query.frequency = {$lte: cart.motherboard.item.maxMemoryFrequency};
        query.type = cart.motherboard.item.memoryType;
    }
    if (cart["power-supply"]) {
        query["$expr"] = {
            $lte: [
                {$add: ["$tdp", totalTdp]},
                cart["power-supply"].item.tdp
            ]
        }
    }
    if (filter === "all") query = {};

    Memory.find(query, function(err, memoryItems){
        if (err) {
            console.log(err);
        } else {
            res.render("products/memory/index", {memoryItems: memoryItems});
        }
    });
});

router.get("/memory/:id", function(req, res){
    memoryId = req.params.id;
    Memory.findById(memoryId, function(err, memory){
        if (err) {
            console.log(err);
        } else {
            res.render("products/memory/show", {memory: memory});
        }
    });
});

router.get("/video-card", function(req, res){
    var cart = req.session.cart.items;
    var filter = req.query.filter;
    var query = {};
    var totalTdp = req.session.cart.totalTdp;

    if (cart["power-supply"]) {
        query["$expr"] = {
            $and: [
                {
                    $lte: [
                        {$add: ["$tdp", totalTdp]},
                        cart["power-supply"].item.tdp
                    ]
                }
            ]
        }
        if (cart.motherboard) {
            query["$expr"]["$and"].push(
                {
                    $lte: [
                        "$sli",
                        cart.motherboard.item.sliSupport
                    ]
                },
                {
                    $lte: [
                        "$crossfire",
                        cart.motherboard.item.crossfireSupport
                    ]
                }
            )
        }
    }
    else if (cart.motherboard) {
        query["$expr"] = {
            $and: [
                {
                    $lte: [
                        "$sli",
                        cart.motherboard.item.sliSupport
                    ]
                },
                {
                    $lte: [
                        "$crossfire",
                        cart.motherboard.item.crossfireSupport
                    ]
                }
            ]
        }
    }
    if (filter === "all") query = {};

    VideoCard.find(query, function(err, videoCardItems){
        if (err) {
            console.log(err);
        } else {
            res.render("products/video-card/index", {videoCardItems: videoCardItems});
        }
    });
});

router.get("/video-card/:id", function(req, res){
    videoCardId = req.params.id;
    VideoCard.findById(videoCardId, function(err, videoCard){
        if (err) {
            console.log(err);
        } else {
            res.render("products/video-card/show", {videoCard: videoCard});
        }
    });
});

router.get("/storage", function(req, res){
    var cart = req.session.cart.items;
    var filter = req.query.filter;
    var query = {};
    var totalTdp = req.session.cart.totalTdp;

    if (cart["power-supply"]) {
        query["$expr"] = {
            $lte: [
                {$add: ["$tdp", totalTdp]},
                cart["power-supply"].item.tdp
            ]
        }
    }
    if (filter === "all") query = {};

    Storage.find(query, function(err, storageItems){
        if (err) {
            console.log(err);
        } else {
            res.render("products/storage/index", {storageItems: storageItems});
        }
    });
});

router.get("/storage/:id", function(req, res){
    storageId = req.params.id;
    Storage.findById(storageId, function(err, storage){
        if (err) {
            console.log(err);
        } else {
            res.render("products/storage/show", {storage: storage});
        }
    });
});

router.get("/case", function(req, res){
    Case.find({}, function(err, caseItems){
        if (err) {
            console.log(err);
        } else {
            res.render("products/case/index", {caseItems: caseItems});
        }
    });
});

router.get("/case/:id", function(req, res){
    caseId = req.params.id;
    Case.findById(caseId, function(err, caseItem){
        if (err) {
            console.log(err);
        } else {
            res.render("products/case/show", {caseItem: caseItem});
        }
    });
});

router.get("/power-supply", function(req, res){
    var filter = req.query.filter;
    var query = {};
    var totalTdp = req.session.cart.totalTdp;

    if (filter === "all") totalTdp = 0;
    query = {"tdp": {$gte: totalTdp}};

    PowerSupply.find(query, function(err, psuItems){
        if (err) {
            console.log(err);
        } else {
            res.render("products/power-supply/index", {psuItems: psuItems});
        }
    });
});

router.get("/power-supply/:id", function(req, res){
    powerSupplyId = req.params.id;
    PowerSupply.findById(powerSupplyId, function(err, powerSupply){
        if (err) {
            console.log(err);
        } else {
            res.render("products/power-supply/show", {powerSupply: powerSupply});
        }
    });
});

router.get("/add-to-cart/:type/:id", function(req, res){
    var type = req.params.type;
    var productId = req.params.id;
    var cart = new Cart(req.session.cart);

    console.log(req.session);
    switch(type) {
        case 'cpu':
            Cpu.findById(productId, function(err, product){
                if (err) {
                    console.log(err);
                }
                cart.add(type, product._id, product);
                req.session.cart = cart;
                console.log(req.session);
                res.redirect("/build");
            });
            break;
        case 'cpu-cooler':
            CpuCooler.findById(productId, function(err, product){
                if (err) {
                    console.log(err);
                }
                cart.add(type, product._id, product);
                req.session.cart = cart;
                console.log(req.session);
                res.redirect("/build");
            });
            break;
        case 'motherboard':
            Motherboard.findById(productId, function(err, product){
                if (err) {
                    console.log(err);
                }
                cart.add(type, product._id, product);
                req.session.cart = cart;
                console.log(req.session);
                res.redirect("/build");
            });
            break;
        case 'memory':
            Memory.findById(productId, function(err, product){
                if (err) {
                    console.log(err);
                }
                cart.add(type, product._id, product);
                req.session.cart = cart;
                console.log(req.session);
                res.redirect("/build");
            });
            break;
        case 'video-card':
            VideoCard.findById(productId, function(err, product){
                if (err) {
                    console.log(err);
                }
                cart.add(type, product._id, product);
                req.session.cart = cart;
                console.log(req.session);
                res.redirect("/build");
            });
            break;
        case 'storage':
            Storage.findById(productId, function(err, product){
                if (err) {
                    console.log(err);
                }
                cart.add(type, product._id, product);
                req.session.cart = cart;
                console.log(req.session);
                res.redirect("/build");
            });
            break;
        case 'case':
            Case.findById(productId, function(err, product){
                if (err) {
                    console.log(err);
                }
                cart.add(type, product._id, product);
                req.session.cart = cart;
                console.log(req.session);
                res.redirect("/build");
            });
            break;
        case 'power-supply':
            PowerSupply.findById(productId, function(err, product){
                if (err) {
                    console.log(err);
                }
                cart.add(type, product._id, product);
                req.session.cart = cart;
                console.log(req.session);
                res.redirect("/build");
            });
            break;
        default:
            console.log("Component not found.");
            return res.redirect("/build");
    }
});

router.get("/remove/:type", function(req, res){
    var type = req.params.type;
    var cart = new Cart(req.session.cart);
    cart.remove(type);
    req.session.cart = cart;
    console.log(req.session);
    res.redirect("/build");
});

module.exports = router;