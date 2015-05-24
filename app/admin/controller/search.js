'use strict';

var admin = angular.module('kiosk-ui.admin');

admin.controller('AdminSearchController', ['$scope', '$state', 'Customer', 'Product', 'IdentifierService',
  function($scope, $state, Customer, Product, IdentifierService) {

    $scope.alerts = [];

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };

    $scope.handleIdentifierResponse = function(item) {

      // TODO: We should do some proper error handling here
      if(item === 'undefined') {
        return;
      }

      // State transition
      if(item.type == 'product') {
        $state.go('admin.products.details', {'productId': item.id});
      }
      else if(item.type == 'customer') {
        $state.go('admin.customers.details', {'customerId': item.id});
      }

    }

    $scope.handleIdentifierError = function(data, status, headers, config) {
      if(status == 404) {
        // Nonexistant identifier status
        $scope.alerts.push({type: 'danger', msg: 'Identifier not found.'});
      }
    }

    $scope.doSearch = function() {
      IdentifierService.getItemFromIdentifier($scope.search_text)
        .success($scope.handleIdentifierResponse)
        .error($scope.handleIdentifierError);
    }

    // Focus the search input
    document.querySelector('#search_text').focus();
    // TODO: This is certainly not the perfect angular-ish way of doing this.

  }]
);
