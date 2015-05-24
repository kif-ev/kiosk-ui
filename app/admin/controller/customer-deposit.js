'use strict';

var admin = angular.module('kiosk-ui.admin');

admin.controller('AdminCustomerDepositController', ['$scope', '$state', '$stateParams', 'Customer', 'CustomerService', 'DepositService',
  function($scope, $state, $stateParams, Customer, CustomerService, DepositService) {

    $scope.alerts = [];

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };

    $scope.customer;

    $scope.handleCustomerResponse = function(item) {
      $scope.customer = item;
    }

    $scope.handleCustomerError = function(data, status, headers, config) {
      alert("Something went wrong. I'm sorry.");
    }

    CustomerService.getCustomer($stateParams.customerId)
      .success($scope.handleCustomerResponse)
      .error($scope.handleCustomerError);

    $scope.handleDepositResponse = function(data) {
      $state.go('admin.customers.details', {'customerId': $scope.customer.id});
    }

    $scope.handleDepositError = function(data, status, headers, config) {
      alert("Something went wrong. I'm sorry.");
    }

    $scope.doDeposit = function() {
      //if(!$scope.deposit_value.$valid) {
      //  $scope.alerts.push({type: 'danger', msg: 'Invalid deposit amount: ' + $scope.deposit_value});
      //  return;
      //}
      DepositService.depositMoneyToCustomer($scope.customer.id, $scope.deposit_value*100)
        .success($scope.handleDepositResponse)
        .error($scope.handleDepositError);
    }

  }]
);
