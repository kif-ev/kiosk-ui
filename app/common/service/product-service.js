var common = angular.module('kiosk-ui.common');

common.service('ProductService', ['$http','AppConfig', 'Product',
  function($http, AppConfig, Product) {

  var base_url = AppConfig.backend;

  // Get all available products
  this.getAllProducts = function() {
    return $http.get(base_url + 'products.json', {
      transformResponse: function (data, headers) {
        alert(data);
        return Product.fromJsonMultiple(data);
      }
    });
  }

  // Get a single product with the given product id
  this.getProduct = function(id) {
    return $http.get(base_url + 'products/' + id + '.json', {
      transformResponse: function (data, headers) {
        return Product.fromJsonSingle(data);
      }
    });
  }

}]);
