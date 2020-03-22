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
    PowerSupply = require("../models/power-supply.js");

router.get("/", function(req, res){
    res.send("Products page.");
});

router.get("/cpu", function(req, res){
    Cpu.find({}, function(err, cpuItems){
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
    CpuCooler.find({}, function(err, cpuCoolerItems){
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
    Motherboard.find({}, function(err, motherboardItems){
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
    Memory.find({}, function(err, memoryItems){
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
    VideoCard.find({}, function(err, videoCardItems){
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
    Storage.find({}, function(err, storageItems){
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
    PowerSupply.find({}, function(err, psuItems){
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

module.exports = router;