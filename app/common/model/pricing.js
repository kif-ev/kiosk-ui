var common = angular.module('kiosk-ui.common');

common.factory('Pricing', function () {

  function Pricing(id, quantity, available_quantity, price) {
    this.type = "pricing";
  	this.id = id;
  	this.quantity = quantity;
  	this.available_quantity = available_quantity;
    this.price = price;
  }

  Pricing.prototype.isValid = function() {
    // TODO: Check for empty names etc.
    if(this.type === 'undefined' ||
       this.type != 'pricing' ||
       this.id === 'undefined' ||
       this.quantity === 'undefined' ||
       this.available_quantity === 'undefined' ||
       this.price === 'undefined') {
         console.log('Invalid pricing entity: ' + this);
         return false;
     }
     else {
       return true;
     }
  }

  // Static method to create a pricing entity from a JSON string
  Pricing.fromJsonSingle = function(data) {

    // Deserialized input data
    var input = angular.fromJson(data);

    // Create new product from input
    var item = new Pricing(input.id, input.quantity, input.available_quantity, input.price);

    // Check validity
    if(!item.isValid()) {
      return null;
    }

    return item;
  }

  // Static method to create an array of multiple pricing entities from a JSON string
  Pricing.fromJsonMultiple = function(data) {

    // Deserialized input data
    var input = angular.fromJson(data);

    // Array to store results
    var result = new Array();

    // Iterate through all values
    for(var i = 0; i < input.length; i++) {

      // Create new product from input
      var item = new Pricing(input[i].id, input[i].quantity, input[i].available_quantity, input[i].price);

      // If one item is invalid, return null immediately
      if(!item.isValid()) {
        return null;
      }

      // Push the item to the result array
      result.push(item);
    }

    return result;
  }

  return Pricing;
});
