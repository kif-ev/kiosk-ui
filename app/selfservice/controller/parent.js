'use strict';

var selfservice = angular.module('kiosk-ui.selfservice');

selfservice.controller('SelfserviceParentController', ['$scope', '$state', 'CartService', 'CartItem', 'Product', 'ProductService', 'Customer', 'IdentifierService',
  function($scope, $state, CartService, CartItem, Product, ProductService, Customer, IdentifierService) {

    // Variable to contain the barcode/keyboard input
    $scope.inputText = '';

    // Add typed character to the input text
    $scope.addInputCharacter = function(character) {
      $scope.inputText += character;
    }

    // Submit the current input, process response asynchronously
    $scope.submitInput = function() {
      IdentifierService.getItemFromIdentifier($scope.inputText)
        .success(function (item) {

          // TODO: We should do some proper error handling here
          if(item === 'undefined') {
            return;
          }

          if(item.type == 'product') {
            $state.go('selfservice.productinfo', {'productId': item.id});
          }
          else if(item.type == 'customer') {
            console.log('Hello ' + item.name);
          }

        });

      // Reset the input text after sending it to the server
      $scope.inputText = '';
    }


  }]
);
