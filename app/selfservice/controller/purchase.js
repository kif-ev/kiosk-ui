'use strict';

var selfservice = angular.module('kiosk-ui.selfservice');

selfservice.controller('SelfservicePurchaseController', ['$scope', '$state', 'KeypadInputService',
  function($scope, $state, KeypadInputService) {

    KeypadInputService.setScope($scope);

    // Quantity display format
    $scope.displayItemQuantityAndPrice = function(item) {
      if(item.quantity <= 1){
        return '';
      }
      else {
        return item.quantity + 'x ' + (item.unit_price/100).toFixed(2) + '€';
      }
    }

    // Total price format
    $scope.displayItemTotalPrice = function(item) {
      return (item.unit_price*item.quantity/100).toFixed(2) + '€';
    }

    $scope.onIncrease = function() {
      $scope.increaseLastQuantity();
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
      else {
        $scope.doCheckout();
      }
    };

    // Abort
    $scope.onCancel = function() {
      if($scope.input_text){
        $scope.resetInput();
      }
      else{
        $scope.resetState();
      }
    };

    // If user is not defined, go back to start state
    if(!$scope.cart.user_id) {
      $state.go('selfservice.start');
    }

  }]
);
