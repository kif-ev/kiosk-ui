var common = angular.module('kiosk-ui.common');

common.service('TransactionService', ['$http', 'AppConfig', 'Transaction',
  function($http, AppConfig, Transaction) {

    var base_url = AppConfig.backend;

    this.getAllTransactions = function() {
      return $http.get(base_url + 'transactions.json', {
        transformResponse: function (data, headers) {
          return Transaction.fromJsonMultiple(data);
        }
      });
    }

    this.getTransactionsByTime = function(start, end) {
      var temp_data = {"q": { "created_at_gteq": start.toISOString(), "created_at_lt": end.toISOString() }};
      return $http.post(base_url + 'transactions/search.json', temp_data, {
        transformResponse: function (data, headers) {
          return Transaction.fromJsonMultiple(data);
        }});
    }

    this.getTransactionsByUserId = function(user_id) {
      var temp_data = {"q": { "user_id_eq": user_id }};
      return $http.post(base_url + 'transactions/search.json', temp_data, {
        transformResponse: function (data, headers) {
          return Transaction.fromJsonMultiple(data);
        }});
    }

}]);
