module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalPrice = oldCart.totalPrice || 0;
    this.totalTdp = oldCart.totalTdp || 0;

    this.add = function(type, id, item) {
        if (isEmpty(this.items[type])) {
            this.totalPrice += item.price;
            if (type != "power-supply" && type != "case") this.totalTdp += item.tdp;
        } else {
            this.totalPrice -= this.items[type].item.price;
            this.totalPrice += item.price;
            if (type != "power-supply" && type != "case") {
                this.totalTdp -= this.items[type].item.tdp;
                this.totalTdp += item.tdp;
            }
        }
        this.items[type] = {id: id, item: item};
    }

    this.remove = function(type) {
        if (this.items[type]) {
            this.totalPrice -= this.items[type].item.price;
            if (type != "power-supply" && type != "case") {
                this.totalTdp -= this.items[type].item.tdp;
            }
            delete this.items[type];
        }
    }
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}