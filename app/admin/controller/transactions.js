'use strict';

var admin = angular.module('kiosk-ui.admin');

admin.controller('AdminTransactionsController', ['$scope', '$state', 'Transaction', 'TransactionService',
  function($scope, $state, Transaction, TransactionService) {

    // User balance format
    $scope.displayBalance= function(value) {
      return (value/100).toFixed(2) + '€';
    }

    $scope.displayTime= function(value) {
      var time = new Date(Date.parse(value));
      return time.toString();
    }

  }]
);
