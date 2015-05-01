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

    // Cart test
    $scope.items = CartService.getAllItems();
    var item = new CartItem(1,'Testitem',1,0.50);
    CartService.addItem(item);

    // Products test
    $scope.products;
    ProductService.getAllProducts()
      .success(function (products) {
        $scope.products = products;
      });
  }]
);
