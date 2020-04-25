var mongoose = require("mongoose"),
    Cpu  = require("./models/cpu.js"),
    CpuCooler = require("./models/cpu-cooler.js"),
    Motherboard = require("./models/motherboard.js"),
    Memory = require("./models/memory.js"),
    VideoCard = require("./models/video-card.js"),
    Storage = require("./models/storage.js"),
    Case = require("./models/case.js"),
    PowerSupply = require("./models/power-supply.js");

var cpuData = [
    {
        brand: "Intel",
        name: "Pentium G870",
        socket: "1155",
        frequency: 3.1,
        cores: 2,
        cache: 3,
        tdp: 65,
        price: 82
    },
    {
        brand: "Intel",
        name: "Core i5-3570K",
        socket: "1155",
        frequency: 3.4,
        cores: 4,
        cache: 6,
        tdp: 77,
        price: 235
    },
    {
        brand: "Intel",
        name: "Core i5-9600K",
        socket: "1151",
        frequency: 3.6,
        cores: 6,
        cache: 9,
        tdp: 95,
        price: 249
    },
    {
        brand: "Intel",
        name: "Core i7-8700",
        socket: "1151",
        frequency: 3.2,
        cores: 6,
        cache: 12,
        tdp: 65,
        price: 303
    },
    {
        brand: "AMD",
        name: "Ryzen 5 2600X",
        socket: "AM4",
        frequency: 3.6,
        cores: 6,
        cache: 16,
        tdp: 95,
        price: 229
    },
    {
        brand: "AMD",
        name: "Ryzen 5 3600X",
        socket: "AM4",
        frequency: 3.8,
        cores: 6,
        cache: 32,
        tdp: 95,
        price: 249
    },
    {
        brand: "AMD",
        name: "Ryzen 7 3700X",
        socket: "AM4",
        frequency: 3.6,
        cores: 8,
        cache: 32,
        tdp: 65,
        price: 329
    },
    {
        brand: "AMD",
        name: "Ryzen 9 3950X",
        socket: "AM4",
        frequency: 3.5,
        cores: 16,
        cache: 16,
        tdp: 105,
        price: 749
    }
];

var cpuCoolerData = [
    {
        brand: "Arctic",
        name: "Freezer 50 TR",
        type: "Air",
        fanSize: 120,
        tdp: 5,
        price: 70
    },
    {
        brand: "Cooler Master",
        name: "MasterLiquid ML240R",
        type: "Liquid",
        fanSize: 240,
        tdp: 10,
        price: 119
    }
];

var caseData = [
    {
        brand: "NZXT",
        name: "Model X",
        form: "Tower",
        motherboardSupport: "ATX",
        maxGpuLength: 300,
        maxCoolerHeight: 200,
        maxPsuLength: 200,
        price: 119
    },
    {
        brand: "NZXT",
        name: "Model Y",
        form: "Tower",
        motherboardSupport: "ATX",
        maxGpuLength: 300,
        maxCoolerHeight: 200,
        maxPsuLength: 200,
        price: 119
    },
    {
        brand: "NZXT",
        name: "Model Z",
        form: "Tower",
        motherboardSupport: "ATX",
        maxGpuLength: 300,
        maxCoolerHeight: 200,
        maxPsuLength: 200,
        price: 119
    }
];

var memoryData = [
    {
        brand: "Corsair",
        name: "Vengeance LPX",
        capacity: 16,
        frequency: 3200,
        type: "DDR4",
        tdp: 5,
        price: 109
    },
    {
        brand: "HyperX",
        name: "Fury",    
        capacity: 8,
        frequency: 2400,
        type: "DDR4",
        tdp: 5,
        price: 59
    },
    {
        brand: "HyperX",
        name: "Fury RGB",
        capacity: 16,
        frequency: 3200,
        type: "DDR4",
        tdp: 5,
        price: 169
    },
    {
        brand: "HyperX",
        name: "Fury",
        capacity: 8,
        frequency: 1866,
        type: "DDR3",
        tdp: 5,
        price: 49
    },
    {
        brand: "Corsair",
        name: "Vengeance LP",
        capacity: 8,
        frequency: 1600,
        type: "DDR3",
        tdp: 5,
        price: 55
    }
];

var motherboardData = [
    {
        brand: "ASRock",
        name: "H77 Pro4-M",
        form: "miniATX",
        socket: "1155",
        memorySlots: 4,
        maxMemory: 32,
        maxMemoryFrequency: 1600,
        memoryType: "DDR3",
        sliSupport: 2,
        crossfireSupport: 2,
        tdp: 50,
        price: 80
    },
    {
        brand: "Gigabyte",
        name: "B450 Gaming X",
        form: "ATX",
        socket: "AM4",
        memorySlots: 4,
        maxMemory: 32,
        maxMemoryFrequency: 3600,
        memoryType: "DDR4",
        sliSupport: 2,
        crossfireSupport: 2,
        tdp: 50,
        price: 119
    },
    {
        brand: "Asus",
        name: "STRIX Z270H GAMING",
        form: "ATX",
        socket: "1151",
        memorySlots: 4,
        maxMemory: 64,
        maxMemoryFrequency: 3866,
        memoryType: "DDR4",
        sliSupport: 2,
        crossfireSupport: 2,
        tdp: 50,
        price: 300
    }
];

var gpuData = [
    {
        brand: "AMD",
        name: "Radeon HD 6770 Powercolor",
        memory: 1024,
        memoryType: "GDDR5",
        coreFrequency: 800,
        memoryFrequency: 1400,
        sli: 0,
        crossfire: 0,
        tdp: 100,
        price: 119
    },
    {
        brand: "Nvidia",
        name: "GTX 690 2-Way SLI",
        memory: 8192,
        memoryType: "GDDR5",
        coreFrequency: 915,
        memoryFrequency: 1500,
        sli: 2,
        crossfire: 0,
        tdp: 600,
        price: 1999
    },
    {
        brand: "Nvidia",
        name: "GTX 690 4-Way SLI",
        memory: 16384,
        memoryType: "GDDR5",
        coreFrequency: 915,
        memoryFrequency: 1500,
        sli: 4,
        crossfire: 0,
        tdp: 1200,
        price: 3999
    },
    {
        brand: "AMD",
        name: "Radeon RX 5700 XT",
        memory: 8192,
        memoryType: "GDDR6",
        coreFrequency: 1770,
        memoryFrequency: 14000,
        sli: 0,
        crossfire: 0,
        tdp: 200,
        price: 599
    },
    {
        brand: "AMD",
        name: "Radeon RX 580 2-Way CrossFire",
        memory: 8192,
        memoryType: "GDDR5",
        coreFrequency: 1257,
        memoryFrequency: 2000,
        sli: 0,
        crossfire: 2,
        tdp: 300,
        price: 450
    },
    {
        brand: "AMD",
        name: "Radeon RX Vega 64 Air 2-Way Crossfire",
        memory: 8192,
        memoryType: "HBM-2",
        coreFrequency: 1247,
        memoryFrequency: 500,
        sli: 0,
        crossfire: 2,
        tdp: 300,
        price: 1400
    },
    {
        brand: "Nvidia",
        name: "RTX 2080 Ti GAMING X TRIO",
        memory: 11000,
        memoryType: "GDDR6",
        coreFrequency: 1350,
        memoryFrequency: 14000,
        sli: 0,
        crossfire: 0,
        tdp: 250,
        price: 1500
    }
];

var psuData = [
    {
        brand: "Chieftec",
        name: "GPS 500-A8",
        rating: "80%",
        fanSize: 100,
        tdp: 500,
        price: 129
    },
    {
        brand: "Corsair",
        name: "Model X",
        rating: "90%",
        fanSize: 150,
        tdp: 1500,
        price: 1129
    }
];

var storageData = [
    {
        brand: "Seagate",
        name: "Model #1",
        type: "HDD",
        capacity: 500,
        size: 150,
        cache: 30,
        spinSpeed: 7200,
        tdp: 25,
        price: 99
    },
    {
        brand: "Seagate",
        name: "Model #2",
        type: "HDD",
        capacity: 1000,
        size: 150,
        cache: 30,
        spinSpeed: 5400,
        tdp: 25,
        price: 129
    }
];

function seedDB() {
    Cpu.deleteMany({}, function(err){
        if (err) {
            console.log(err);
        } else {
            console.log("Removed all CPUs from database.");
            cpuData.forEach(function(cpu){
                Cpu.create(cpu, function(err, cpu){
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Added CPU " + cpu.name);
                    }
                });
            });
        }
    });

    CpuCooler.deleteMany({}, function(err){
        if (err) {
            console.log(err);
        } else {
            console.log("Removed all CPU coolers from database.");
            cpuCoolerData.forEach(function(cpuCooler){
                CpuCooler.create(cpuCooler, function(err, cpuCooler){
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Added CPU cooler " + cpuCooler.name);
                    }
                });
            });
        }
    });

    Case.deleteMany({}, function(err){
        if (err) {
            console.log(err);
        } else {
            console.log("Removed all cases from database.");
            caseData.forEach(function(caseItem){
                Case.create(caseItem, function(err, caseItem){
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Added case " + caseItem.name);
                    }
                });
            });
        }
    });

    Memory.deleteMany({}, function(err){
        if (err) {
            console.log(err);
        } else {
            console.log("Removed all memory from database.");
            memoryData.forEach(function(memory){
                Memory.create(memory, function(err, memory){
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Added memory " + memory.name);
                    }
                });
            });
        }
    });

    Motherboard.deleteMany({}, function(err){
        if (err) {
            console.log(err);
        } else {
            console.log("Removed all motherboards from database.");
            motherboardData.forEach(function(motherboard){
                Motherboard.create(motherboard, function(err, motherboard){
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Added motherboard " + motherboard.name);
                    }
                });
            });
        }
    });

    VideoCard.deleteMany({}, function(err){
        if (err) {
            console.log(err);
        } else {
            console.log("Removed all video cards from database.");
            gpuData.forEach(function(videoCard){
                VideoCard.create(videoCard, function(err, videoCard){
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Added video card " + videoCard.name);
                    }
                });
            });
        }
    });

    PowerSupply.deleteMany({}, function(err){
        if (err) {
            console.log(err);
        } else {
            console.log("Removed all PSUs from database.");
            psuData.forEach(function(psu){
                PowerSupply.create(psu, function(err, psu){
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Added PSU " + psu.name);
                    }
                });
            });
        }
    });

    Storage.deleteMany({}, function(err){
        if (err) {
            console.log(err);
        } else {
            console.log("Removed all storage from database.");
            storageData.forEach(function(storage){
                Storage.create(storage, function(err, storage){
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Added storage " + storage.name);
                    }
                });
            });
        }
    });
};

module.exports = seedDB;