var common = angular.module('kiosk-ui.common');

common.factory('Transaction', ['TransactionItem', function (TransactionItem) {

  function Transaction(transaction_type, user_name, user_id, amount, created_at, transaction_items) {
    this.type = "transaction";
    this.transaction_type = transaction_type;
    this.user_name = user_name;
    this.user_id = user_id;
    this.amount = amount;
    this.created_at = created_at;
    this.transaction_items = transaction_items;
  }

  // TODO: Extend with proper checks
  Transaction.prototype.isValid = function() {
    if(this.type === 'undefined' ||
       this.type != 'transaction') {
         console.log('Invalid transaction entity: ' + this);
         return false;
     }
     else {
       return true;
     }
  }

  Transaction.prototype.getTimestamp = function() {
    return Date.parse(this.created_at);
  }

  // Static method to create a cart entity from a JSON string
  Transaction.fromJsonSingle = function(data) {

    // Deserialized input data
    var input = angular.fromJson(data);

    // Create new cart from input
    var items = TransactionItem.fromJsonMultiple(input.transaction_items);
    var ta = new Transaction(input.transaction_type, input.user_name, input.user_id, input.amount, input.created_at, items);

    // Check validity
    if(!ta.isValid()) {
      return null;
    }

    return ta;
  }

  Transaction.fromJsonMultiple = function(data) {

    // Deserialized input data
    var input = angular.fromJson(data);

    // Array to store results
    var result = new Array();

    // Iterate through all values
    for(var i = 0; i < input.length; i++) {

      // Create new product from input
      var items = TransactionItem.fromJsonMultiple(input[i].transaction_items);
      var item = new Transaction(input[i].transaction_type, input[i].user_name, input[i].user_id, input[i].amount, input[i].created_at, items);

      // If one item is invalid, return null immediately
      if(!item.isValid()) {
        return null;
      }

      // Push the item to the result array
      result.push(item);
    }

    return result;
  }

  return Transaction;
}]);
