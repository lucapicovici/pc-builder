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
        name: "Core i7 7700HQ",
        socket: "FCBGA1440",
        frequency: 2.8,
        cores: 4,
        cache: 6,
        tdp: 45,
        price: 300
    },
    {
        brand: "Intel",
        name: "Core i7 7700HQ",
        socket: "FCBGA1440",
        frequency: 2.8,
        cores: 4,
        cache: 6,
        tdp: 45,
        price: 300
    },
    {
        brand: "Intel",
        name: "Core i7 7700HQ",
        socket: "FCBGA1440",
        frequency: 2.8,
        cores: 4,
        cache: 6,
        tdp: 45,
        price: 300
    }
];

var cpuCoolerData = [
    {
        brand: "Noctua",
        name: "Model #1",
        type: "Cooler Type",
        fanSize: 20,
        tdp: 5,
        price: 109
    },
    {
        brand: "Noctua",
        name: "Model #2",
        type: "Cooler Type",
        fanSize: 25,
        tdp: 10,
        price: 139
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
        name: "Name #1",
        capacity: 4096,
        frequency: 1866,
        type: "DDR3",
        tdp: 5,
        price: 99
    },
    {
        brand: "Corsair",
        name: "Name #2",
        capacity: 8192,
        frequency: 2133,
        type: "DDR3",
        tdp: 5,
        price: 229
    },
    {
        brand: "Corsair",
        name: "Name #3",
        capacity: 4096,
        frequency: 2133,
        type: "DDR3",
        tdp: 5,
        price: 159
    }
];

var motherboardData = [
    {
        brand: "ASRock",
        name: "H77 Pro4-M",
        form: "miniATX",
        socket: "1155",
        memorySlots: 4,
        maxMemoryFrequency: 1600,
        memoryType: "DDR3",
        sliSupport: 2,
        crossfireSupport: 2,
        tdp: 50,
        price: 80
    },
    {
        brand: "ASRock",
        name: "H77 Pro4-M",
        form: "miniATX",
        socket: "1155",
        memorySlots: 4,
        maxMemoryFrequency: 1600,
        memoryType: "DDR3",
        sliSupport: 2,
        crossfireSupport: 2,
        tdp: 50,
        price: 80
    },
    {
        brand: "ASRock",
        name: "H77 Pro4-M",
        form: "miniATX",
        socket: "1155",
        memorySlots: 4,
        maxMemoryFrequency: 1600,
        memoryType: "DDR3",
        sliSupport: 2,
        crossfireSupport: 2,
        tdp: 50,
        price: 80
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
        name: "GTX 690 4-Way SLI",
        memory: 16384,
        memoryType: "GDDR5",
        coreFrequency: 915,
        memoryFrequency: 1500,
        sli: 4,
        crossfire: 0,
        tdp: 1200,
        price: 3999
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