'use strict';

var selfservice = angular.module('kiosk-ui.selfservice');

selfservice.controller('SelfserviceProductinfoController', ['$scope', '$stateParams', '$state', '$timeout', 'Product','ProductService',
  function($scope, $stateParams, $state, $timeout, Product, ProductService) {

    function returnToStart() {
      $state.go('selfservice.start');
    }

    $scope.product;
    ProductService.getProduct($stateParams.productId)
      .success(function (product) {
        $scope.product = product;
    });

    $timeout(returnToStart, 5000);

  }]
);
