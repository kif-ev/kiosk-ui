var common = angular.module('kiosk-ui.common');

common.service('CustomerService', ['$http', 'AppConfig', 'Customer',
  function($http, AppConfig, Customer) {

    var base_url = AppConfig.backend;

    // Get a customer by id
    this.getCustomer = function(id) {
      return $http.get(base_url + 'users/' + id + '.json', {
        transformResponse: function (data, headers) {
          return Customer.fromJsonSingle(data);
        }
      });
    }

    // Get a customer by id
    this.getAllCustomers = function() {
      return $http.get(base_url + 'users.json', {
        transformResponse: function (data, headers) {
          return Customer.fromJsonMultiple(data);
        }
      });
    }

}]);
