'use strict';

var selfservice = angular.module('kiosk-ui.selfservice');

selfservice.controller('SelfservicePurchaseController', ['$scope', '$stateParams', '$state',
  function($scope, $stateParams, $state) {

    $scope.cart.setUser($stateParams.user_id);
    $scope.user_name = $stateParams.user_name;

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
