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

  // Static method to create a product entity from a JSON string
  Cart.fromJson = function(data) {

    // Deserialized input data
    var input = angular.fromJson(data);

    // Create new cart
    var item = new Cart();

    // Check validity
    if(!item.isValid()) {
      return null;
    }

    return item;
  }

  Cart.prototype.setUser = function(id) {
    this.user_id = id;
  }

  // Add a new item to the cart
  Cart.prototype.addItem = function(item) {
    this.cart_items.push(item);
  };

  // Get a list of all items
  Cart.prototype.getAllItems = function() {
    return this.cart_items;
  };

  return Cart;
});
