var common = angular.module('kiosk-ui.common');

common.service('CartService', ['$http', 'AppConfig', 'Cart',
  function($http, AppConfig, Cart) {

  var base_url = AppConfig.backend;

  this.createCartForUserId = function(id) {
    var cart = new Cart();
    cart.setUser(id);
    return $http.post(base_url + 'carts.json', cart, {
      transformResponse: function (data, headers) {
        // Transform the response to a valid cart object
        return Cart.fromJson(data);
      }
    });
  }

  this.updateCart = function(cart) {
    return $http.patch(base_url + 'carts/' + cart.id + '.json', cart, {
      transformResponse: function (data, headers) {
        // Transform the response to a valid cart object
        return Cart.fromJson(data);
      }
    });
  }

  this.payCart = function(cart) {
    var temp_data = {"cart_id": cart.id};
    return $http.post(base_url + 'carts/' + cart.id + '/pay.json', temp_data);
  }

}]);
