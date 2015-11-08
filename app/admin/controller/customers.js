'use strict';

var admin = angular.module('kiosk-ui.admin');

admin.controller('AdminCustomersController', ['$scope', '$state', 'Customer', 'IdentifierService',
  function($scope, $state, Customer, IdentifierService) {

    // User balance format
    $scope.displayBalance= function(value) {
      return (value/100).toFixed(2) + '€';
    }

  }]
);
