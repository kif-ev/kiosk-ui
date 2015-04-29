var common = angular.module('kiosk-ui.common');

common.factory('Product', ['$http', function ($http) {

  var base_url = 'https://oskiosk.herokuapp.com:443/'

  function Product(id, name, quantity, available_quantity, pricings) {
    this.type = "product";
  	this.id = id;
  	this.name = name;
  	this.quantity = quantity;
  	this.available_quantity = available_quantity;
    this.pricings = pricings;
  }

  Product.getProduct = function(id) {
    return $http.get(base_url + 'products/' + id + '.json');
  }

  Product.getAllProducts = function() {
    return $http.get(base_url + 'products.json');
  }

  Product.checkIfValid = function(entity) {
    // If entity is an array, iterate through all elements and check them
    if(entity instanceof Array) {
      for(var i = 0; i < entity.length; i++) {
        result = Product.checkIfValid(entity[i]);
        if(result == false) return false;
      }
      // If all checks succeeded, return true
      return true;
    }
    // Else entity is a single object that should be checked
    {
      if(entity.type === 'undefined' ||
         entity.type != 'product' ||
         entity.id === 'undefined' ||
         entity.name === 'undefined' ||
         entity.quantity === 'undefined' ||
         entity.available_quantity === 'undefined' ||
         entity.pricings === 'undefined') {
           return false;
         }
         else {
           return true;
         }
    }
  }

  Product.fromJson = function(entity) {

    // Check JSON for validity and return null if invalid
    if(!Product.checkIfValid(entity)) {
      return null;
    }

    // Return object from JSON values
    return new Product(entity.id, entity.name, entity.quantity, entity.available_quantity, entity.pricings);
  }

  Product.fromJsonArray = function(entity) {

    // Array to store results
    var result = new Array();

    // Iterate through all values
    for(var i = 0; i < entity.length; i++) {

      // If one item is invalid, return null immediately
      item = Product.fromJson(entity[i]);
      if(item == null) {
        return null;
      }

      // Push the item to the result array
      result.push(item);
    }

    return result;
  }

  return Product;
}]);
