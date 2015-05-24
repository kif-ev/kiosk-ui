var common = angular.module('kiosk-ui.common');

common.service('DepositService', ['$http', 'AppConfig',
  function($http, AppConfig) {

  var base_url = AppConfig.backend;

  this.depositMoneyToCustomer = function(id, amount) {
    var temp_data = {"amount": amount};
    return $http.post(base_url + 'users/' + id + '/deposit.json', temp_data);
  }

}]);
