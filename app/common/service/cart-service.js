var common = angular.module('kiosk-ui.common');

common.service('CartService', function() {

  this.cart_items = new Array();

  // Add a new item to the cart
  this.addItem = function(item) {
    this.cart_items.push(item);
  };

  // Get a list of all items
  this.getAllItems = function() {
    return this.cart_items;
  };
});
