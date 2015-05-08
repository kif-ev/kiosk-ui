var common = angular.module('kiosk-ui.common');

common.factory('Cart', function () {

  function Cart() {
    this.type = "cart";
    this.cart_items = new Array();
  }

  // TODO: Extend with proper checks
  Cart.prototype.isValid = function() {
    if(this.type === 'undefined' ||
       this.type != 'cart') {
         console.log('Invalid cart entity: ' + this);
         return false;
     }
     else {
       return true;
     }
  }

  Cart.prototype.setUser = function(id) {
    this.user_id = id;
  }

  Cart.prototype.getItem = function(id) {
    // Search through all items and return first item matching the id
    for(var i = 0; i < this.cart_items.length; i++) {
      if(this.cart_items[i].id == id) {
        return this.cart_items[i].id;
      }
    }

    // If id not found, return null
    return null;
  }

  Cart.prototype.getItemIndex = function(id) {
    // Search through all items and return index of the first item matching the id
    for(var i = 0; i < this.cart_items.length; i++) {
      if(this.cart_items[i].id == id) {
        return i;
      }
    }

    // If id not found, return null
    return null;
  }

  // Add a new item to the cart
  Cart.prototype.addItem = function(item) {
    //TODO: Check that only cart items can be added
    var index = this.getItemIndex(item.id);
    // If this pricing already is in the cart, aggregate the quantities
    if(index != null){
      item.quantity += this.cart_items[index].quantity;
      this.cart_items.splice(index,1);
    }
    this.cart_items.push(item);
  };

  // Get a list of all items
  Cart.prototype.getAllItems = function() {
    return this.cart_items;
  };

  return Cart;
});
