'use strict';

var selfservice = angular.module('kiosk-ui.selfservice');

selfservice.controller('SelfserviceEndController', ['$scope', '$state', '$stateParams', '$timeout', 'KeypadInputService', 'CustomerService', 'TransactionService',
  function($scope, $state, $stateParams, $timeout, KeypadInputService, CustomerService, TransactionService) {

    // User balance format
    $scope.displayBalance= function(value) {
      return (value/100).toFixed(2) + '€';
    }

    // Display time representation
    $scope.displayTime= function(value) {
      var time = new Date(Date.parse(value));
      return time.toString();
    }

    // Query user balance;
    $scope.customer;
    CustomerService.getCustomer($stateParams.customerId)
      .success(function (customer) {
        $scope.customer = customer;
    });

    // Show past transactions
    $scope.handleTransactionsResponse = function(items) {
      $scope.transactions = items;
    }

    $scope.handleTransactionsError = function(data, status, headers, config) {
      //TODO
    }

    TransactionService.getTransactionsByUserId($stateParams.customerId)
      .success($scope.handleTransactionsResponse)
      .error($scope.handleTransactionsError);

    // Automatic state transition after timeout
    function returnToStart() {
      $scope.resetState();
      $state.go('selfservice.start');
    }

    $timeout(returnToStart, 5000);

    // Set input event scope to this controller
    KeypadInputService.setScope($scope);

    $scope.onIncrease = function() {
      // There is nothing to do here
    };

    $scope.onDecrease = function() {
      // There is nothing to do here
    };

    $scope.onInput = function(character) {
      // There is nothing to do here
    };

    $scope.onConfirm = function() {
      // There is nothing to do here
    };

    // Abort
    $scope.onCancel = function() {
      // There is nothing to do here
    };

  }]
);
