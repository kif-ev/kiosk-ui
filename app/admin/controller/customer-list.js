'use strict';

var admin = angular.module('kiosk-ui.admin');

admin.controller('AdminCustomerListController', ['$scope', '$state', 'Customer', 'CustomerService',
  function($scope, $state, Customer, CustomerService) {

    $scope.customers;

    $scope.handleCustomersResponse = function(items) {
      $scope.customers = items;
    }

    $scope.handleCustomersError = function(data, status, headers, config) {
      alert("Something went wrong. I'm sorry.");
    }

    CustomerService.getAllCustomers()
      .success($scope.handleCustomersResponse)
      .error($scope.handleCustomersError);


  }]
);
