var common = angular.module('kiosk-ui.common');

common.factory('Customer', function () {

  function Customer(id, name, balance) {
    this.type = "customer";
  	this.id = id;
  	this.name = name;
    this.balance = balance;
  }

  Customer.prototype.isValid = function() {
    // TODO: Check for empty names etc.
    if(this.type === 'undefined' ||
       this.type != 'customer' ||
       this.id === 'undefined' ||
       this.name === 'undefined' ||
       this.balance === 'undefined') {
         console.log('Invalid customer entity: ' + this);
         return false;
     }
     else {
       return true;
     }
  }

  // Static method to create a customer entity from a JSON string
  Customer.fromJson = function(data) {

    // Deserialized input data
    var input = angular.fromJson(data);

    // Create new product from input
    var item = new Customer(input.id, input.name, input.balance);

    // Check validity
    if(!item.isValid()) {
      return null;
    }

    return item;
  }

  return Customer;
});
