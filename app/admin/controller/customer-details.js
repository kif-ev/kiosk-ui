'use strict';

var admin = angular.module('kiosk-ui.admin');

admin.controller('AdminCustomerDetailsController', ['$scope', '$state', '$stateParams', 'Customer', 'CustomerService',
  function($scope, $state, $stateParams, Customer, CustomerService) {

    $scope.customer;

    // User balance format
    $scope.displayBalance= function(value) {
      return (value/100).toFixed(2) + '€';
    }

    $scope.handleCustomerResponse = function(item) {
      $scope.customer = item;
    }

    $scope.handleCustomerError = function(data, status, headers, config) {
      alert("Something went wrong. I'm sorry.");
    }

    CustomerService.getCustomer($stateParams.customerId)
      .success($scope.handleCustomerResponse)
      .error($scope.handleCustomerError);

  }]
);
