'use strict';

var selfservice = angular.module('kiosk-ui.selfservice');

selfservice.controller('SelfserviceStartController', ['$scope', 'CartService', 'CartItem','Product',
  function($scope, CartService, CartItem, Product) {
    $scope.inputText = '';

    // Input test
    $scope.onInput = function(character) {
      $scope.inputText += character;
    };

    // Cart test
    $scope.items = CartService.getAllItems();
    var item = new CartItem(1,'Testitem',1,0.50);
    CartService.addItem(item);

    // Products test
    $scope.products;
    Product.getAllProducts()
      .success(function (products) {
        result = Product.checkIfValid(products);
        if(result == true){
          $scope.products = products;
        }
        else{
          // Error handling
        }
      });
  }]
);
