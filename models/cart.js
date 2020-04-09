module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {
        Cpu: {},
        CpuCooler: {},
        Motherboard: {},
        Memory: {},
        VideoCard: {},
        Storage: {},
        Case: {},
        PowerSupply: {}
    };
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function(type, id, item) {
        // console.log(this.items);
        console.log(this.totalPrice);
        // console.log(id);
        // console.log(item);
        // console.log(typeof this.items[type]);
        // console.log(this.items[type].item);

        if (isEmpty(this.items[type])) {
            this.totalPrice += item.price;
        } else {
            this.totalPrice -= this.items[type].item.price;
            this.totalPrice += item.price;
        }
        this.items[type] = {id: id, item: item};
    }

    this.remove = function(type) {
        this.totalPrice -= this.items[type].item.price;
        this.items[type] = {};
    }
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}