var common = angular.module('kiosk-ui.common');

common.factory('Cart', ['CartItem', function (CartItem) {

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

  Cart.prototype.setId = function(id) {
    this.id = id;
  }

  Cart.prototype.setUser = function(user_id) {
    this.user_id = user_id;
  }

  Cart.prototype.getItem = function(pricing_id) {
    // Search through all items and return first item matching the id
    for(var i = 0; i < this.cart_items.length; i++) {
      if(this.cart_items[i].pricing_id == pricing_id) {
        return this.cart_items[i];
      }
    }

    // If id not found, return null
    return null;
  }

  Cart.prototype.getItemIndex = function(pricing_id) {
    // Search through all items and return index of the first item matching the id
    for(var i = 0; i < this.cart_items.length; i++) {
      if(this.cart_items[i].pricing_id == pricing_id) {
        return i;
      }
    }

    // If id not found, return null
    return null;
  }

  // Add a new item to the cart
  Cart.prototype.addItem = function(item) {
    //TODO: Check that only cart items can be added
    var index = this.getItemIndex(item.pricing_id);
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

  // Serialize cart i.e. for sending it to the backend
  Cart.prototype.toJson = function() {
    return angular.toJson(this);
  }

  // Static method to create a cart entity from a JSON string
  Cart.fromJson = function(data) {

    // Deserialized input data
    var input = angular.fromJson(data);

    // Create new cart from input
    var cart = new Cart();
    cart.setId(input.id);
    cart.setUser(input.user_id);
    cart.cart_items = CartItem.fromJsonMultiple(input.cart_items);

    // Check validity
    if(!cart.isValid()) {
      return null;
    }

    return cart;
  }

  return Cart;
}]);
