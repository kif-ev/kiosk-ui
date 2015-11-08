var common = angular.module('kiosk-ui.common');

common.factory('TransactionItem', function () {

  function TransactionItem(id, product_id, price, name, quantity) {
    this.type = "transaction_item";
    this.id = id;
  	this.product_id = product_id;
    this.price = price;
  	this.name = name;
  	this.quantity = quantity;
  }

  TransactionItem.prototype.isValid = function() {
    // TODO: Check for empty names etc.
    if(this.type === 'undefined' ||
       this.type != 'transaction_item' ||
       this.id === 'undefined' ||
       this.product_id === 'undefined' ||
       this.price === 'undefined' ||
       this.name === 'undefined' ||
       this.quantity === 'undefined') {
         console.log('Invalid transaction item entity: ' + this);
         return false;
     }
     else {
       return true;
     }
  }

  // Static method to create a cart item entity from a JSON string
  TransactionItem.fromJsonSingle = function(data) {

    // Deserialized input data
    var input = angular.fromJson(data);

    // Create new product from input
    var item = new TransactionItem(input.id, input.product_id, input.price, input.name, input.quantity);

    // Check validity
    if(!item.isValid()) {
      return null;
    }

    return item;
  }

  // Static method to create an array of multiple transaction item entities from a JSON string
  TransactionItem.fromJsonMultiple = function(data) {

    // Deserialized input data
    var input = angular.fromJson(data);

    // Array to store results
    var result = new Array();

    // Iterate through all values
    for(var i = 0; i < input.length; i++) {

      // Create new product from input
      var item = new TransactionItem(input[i].id, input[i].product_id, input[i].price, input[i].name, input[i].quantity);

      // If one item is invalid, return null immediately
      if(!item.isValid()) {
        return null;
      }

      // Push the item to the result array
      result.push(item);
    }

    return result;
  }

  return TransactionItem;
})
