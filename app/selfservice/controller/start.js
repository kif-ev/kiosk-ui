'use strict';

var selfservice = angular.module('kiosk-ui.selfservice');

selfservice.controller('SelfserviceStartController', ['$scope', '$state', 'CartService', 'CartItem', 'Product', 'ProductService', 'Customer', 'IdentifierService',
  function($scope, $state, CartService, CartItem, Product, ProductService, Customer, IdentifierService) {

    $scope.onIncrease = function() {
      // There is nothing to do here
    };

    $scope.onDecrease = function() {
      // There is nothing to do here
    };

    // Add typed characters to inout
    $scope.onInput = function(character) {
      $scope.addInputCharacter(character);
    };

    // Submit current input
    $scope.onConfirm = function() {
      $scope.submitInput();
    }

  }]
);
