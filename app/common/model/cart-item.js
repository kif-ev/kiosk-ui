var common = angular.module('kiosk-ui.common');

common.factory('CartItem', function () {

  function CartItem(pricing_id, product_name, quantity, unit_price) {
    this.type = "cart_item";
  	this.pricing_id = pricing_id;
  	this.product_name = product_name;
  	this.quantity = quantity;
  	this.unit_price = unit_price;
  }

  CartItem.prototype.isValid = function() {
    // TODO: Check for empty names etc.
    if(this.type === 'undefined' ||
       this.type != 'cart_item' ||
       this.pricing_id === 'undefined' ||
       this.product_name === 'undefined' ||
       this.quantity === 'undefined' ||
       this.unit_price === 'undefined') {
         console.log('Invalid cart item entity: ' + this);
         return false;
     }
     else {
       return true;
     }
  }

  // Static method to create a cart item entity from a JSON string
  CartItem.fromJsonSingle = function(data) {

    // Deserialized input data
    var input = angular.fromJson(data);

    // Create new product from input
    var item = new CartItem(input.pricing_id, input.product_name, input.quantity, input.unit_price);

    // Check validity
    if(!item.isValid()) {
      return null;
    }

    return item;
  }

  // Static method to create an array of multiple pricing entities from a JSON string
  CartItem.fromJsonMultiple = function(data) {

    // Deserialized input data
    var input = angular.fromJson(data);

    // Array to store results
    var result = new Array();

    // Iterate through all values
    for(var i = 0; i < input.length; i++) {

      // Create new product from input
      var item = new CartItem(input[i].pricing_id, input[i].product_name, input[i].quantity, input[i].unit_price);

      // If one item is invalid, return null immediately
      if(!item.isValid()) {
        return null;
      }

      // Push the item to the result array
      result.push(item);
    }

    return result;
  }

  return CartItem;
})
