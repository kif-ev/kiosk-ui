'use strict';

var selfservice = angular.module('kiosk-ui.selfservice');

selfservice.controller('SelfservicePurchaseController', ['$scope', '$state', '$timeout', 'KeypadInputService',
  function($scope, $state, $timeout, KeypadInputService) {

    KeypadInputService.setScope($scope);
    $scope.confirm_blocked = false;

    // Quantity display format
    $scope.displayItemQuantityAndPrice = function(item) {
      if(item.quantity <= 1){
        return '';
      }
      else {
        return item.quantity + 'x ' + (item.unit_price/100).toFixed(2) + '€';
      }
    }

    // User balance format
    $scope.displayBalance= function(value) {
      return (value/100).toFixed(2) + '€';
    }

    // Total price format
    $scope.displayItemTotalPrice = function(item) {
      return (item.unit_price*item.quantity/100).toFixed(2) + '€';
    }

    // Total price format
    $scope.displayTotalCartPrice = function() {
      var sum = 0;
      for(var i=0; i<$scope.cart.cart_items.length; i++){
        sum += $scope.cart.cart_items[i].unit_price*$scope.cart.cart_items[i].quantity;
      }
      return (sum/100).toFixed(2) + '€';
    }

    $scope.unblockConfirm = function() {
      $scope.confirm_blocked = false;
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

      if($scope.confirm_blocked) {
        return;
      }

      if($scope.input_text){

        $scope.confirm_blocked = true;
        $timeout($scope.unblockConfirm, 1000);

        // TODO: This temporary hack should be done right
        if($scope.input_text == 'CHECKOUT'){
          $scope.doCheckout();
          return;
        }
        if($scope.input_text == 'CANCEL'){
          $scope.resetState();
          return;
        }

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
