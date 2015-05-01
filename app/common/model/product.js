var common = angular.module('kiosk-ui.common');

common.factory('Product', function () {

  function Product(id, name, quantity, available_quantity, pricings) {
    this.type = "product";
  	this.id = id;
  	this.name = name;
  	this.quantity = quantity;
  	this.available_quantity = available_quantity;
    this.pricings = pricings;
  }

  Product.prototype.isValid = function() {
    // TODO: Check for empty names etc.
    if(this.type === 'undefined' ||
       this.type != 'product' ||
       this.id === 'undefined' ||
       this.name === 'undefined' ||
       this.quantity === 'undefined' ||
       this.available_quantity === 'undefined' ||
       this.pricings === 'undefined') {
         console.log('Invalid product entity: ' + this);
         return false;
     }
     else {
       return true;
     }
  }

  // Static method to create a product entity from a JSON string
  Product.fromJsonSingle = function(data) {

    // Deserialized input data
    var input = angular.fromJson(data);

    // Create new product from input
    var item = new Product(input.id, input.name, input.quantity, input.available_quantity, input.pricings);

    // Check validity
    if(!item.isValid()) {
      return null;
    }

    return item;
  }

  // Static method to create an array of multiple product entities from a JSON string
  Product.fromJsonMultiple = function(data) {

    // Deserialized input data
    var input = angular.fromJson(data);

    // Array to store results
    var result = new Array();

    // Iterate through all values
    for(var i = 0; i < input.length; i++) {

      // Create new product from input
      var item = new Product(input[i].id, input[i].name, input[i].quantity, input[i].available_quantity, input[i].pricings);

      // If one item is invalid, return null immediately
      if(!item.isValid()) {
        return null;
      }

      // Push the item to the result array
      result.push(item);
    }

    return result;
  }

  return Product;
});
