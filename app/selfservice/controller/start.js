'use strict';

var selfservice = angular.module('kiosk-ui.selfservice');

selfservice.controller('SelfserviceStartController', ['$scope', '$state', 'CartService', 'CartItem', 'Product', 'ProductService', 'Customer', 'IdentifierService', 'KeypadInputService',
  function($scope, $state, CartService, CartItem, Product, ProductService, Customer, IdentifierService, KeypadInputService) {

    KeypadInputService.setScope($scope);

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
      if($scope.input_text){
        $scope.submitInput();
      }
    }

    // Abort
    $scope.onCancel = function() {
      // Just reset the input, since there is nothing else to abort
      $scope.resetInput();
    };

  }]
);
