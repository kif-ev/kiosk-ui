'use strict';

var admin = angular.module('kiosk-ui.admin');

admin.controller('AdminTransactionListController', ['$scope', '$state', '$stateParams', 'Transaction', 'TransactionService',
  function($scope, $state, $stateParams, Transaction, TransactionService) {

    $scope.transactions;

    $scope.handleTransactionsResponse = function(items) {
      $scope.transactions = items;
    }

    $scope.handleTransactionsError = function(data, status, headers, config) {
      alert("Something went wrong. I'm sorry.");
    }

    if($stateParams.userId) {
      // Query transactions of the given user
      TransactionService.getTransactionsByUserId($stateParams.userId)
        .success($scope.handleTransactionsResponse)
        .error($scope.handleTransactionsError);
    }
    else {
      // Query all transactions
      TransactionService.getAllTransactions()
        .success($scope.handleTransactionsResponse)
        .error($scope.handleTransactionsError);
    }

  }]
);
