var common = angular.module('kiosk-ui.common');

common.factory('CartItem', function () {

  function CartItem(id, name, quantity, unit_price) {
  	this.id = id;
  	this.product_name = name;
  	this.quantity = quantity;
  	this.unit_price = unit_price;
  }

  return CartItem;
})
