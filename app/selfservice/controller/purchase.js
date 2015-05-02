'use strict';

var selfservice = angular.module('kiosk-ui.selfservice');

selfservice.controller('SelfservicePurchaseController', ['$scope', '$stateParams', '$state', '$interval', 'Product','ProductService',
  function($scope, $stateParams, $state, $interval, Product, ProductService) {

    $scope.cart.setUser($stateParams.user_id);
    $scope.user_name = $stateParams.user_name;

  }]
);
