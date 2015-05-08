var common = angular.module('kiosk-ui.common');

common.service('CustomerService', ['$http','Customer',
  function($http,Customer) {

  var base_url = 'http://localhost:3000/'

  // Currently there is no API for interacting with customers, so this is empty.

}]);
