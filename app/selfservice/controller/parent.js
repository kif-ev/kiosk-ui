'use strict';

var selfservice = angular.module('kiosk-ui.selfservice');

selfservice.controller('SelfserviceParentController', ['$scope', '$state', 'CartService', 'CartItem', 'Cart', 'Product', 'ProductService', 'Customer', 'IdentifierService',
  function($scope, $state, CartService, CartItem, Cart, Product, ProductService, Customer, IdentifierService) {

    $scope.initialize = function() {
      // Variable to contain the barcode/keyboard input
      $scope.input_text = '';
      $scope.cart = new Cart();

      // Status display
      $scope.progress_class = 'progress-bar-success';
      $scope.progress_text = 'Ready';
    }

    // Add typed character to the input text
    $scope.addInputCharacter = function(character) {
      $scope.input_text += character;
    }

    // Submit the current input, process response asynchronously
    $scope.submitInput = function() {
      // Change status display
      $scope.progress_class = 'progress-bar-info progress-bar-striped active';
      $scope.progress_text = 'Please wait ...';

      // Talk to the backend
      IdentifierService.getItemFromIdentifier($scope.input_text)
        .success($scope.handleIdentifierResponse)
        .error($scope.handleIdentifierError);

      // Reset the input text after sending it to the server
      $scope.input_text = '';
    }

    // Checkout (pay) the current cart
    $scope.doCheckout = function() {
      if(!$scope.cart.cart_items || $scope.cart.cart_items.length == 0){
        return;
      }
      CartService.payCart($scope.cart)
        .success($scope.handlePayCartResponse)
        .error($scope.handlePayCartError);
    }

    $scope.handleIdentifierResponse = function(item) {

      // TODO: We should do some proper error handling here
      if(item === 'undefined') {
        // Status display
        $scope.progress_class = 'progress-bar-danger';
        $scope.progress_text = 'Error. Received invalid response from backend.';
        return;
      }

      // Call different handlers according to the returned entity
      if(item.type == 'product') {
        $scope.handleProductResponse(item);
      }
      else if(item.type == 'customer') {
        $scope.handleCustomerResponse(item);
      }

    }

    $scope.handleProductResponse = function(item) {
      if($scope.cart.user_id === undefined) {
        // If no user is logged in, just show the product info
        //$state.go('selfservice.productinfo', {'productId': item.id});
        $scope.progress_class = 'progress-bar-warning';
        $scope.progress_text = 'Please login before scanning products.';
      }
      else {
        // Status display
        $scope.progress_class = 'progress-bar-success';
        $scope.progress_text = 'Found product ' + item.name + '.';
        // Else add the product to the cart
        var pr = item.getLowestAvailablePricing();
        var it = new CartItem(pr.id, item.name, 1, pr.price);
        $scope.cart.addItem(it);
        CartService.updateCart($scope.cart)
          .success($scope.handleUpdateCartResponse)
          .error($scope.handleUpdateCartError);
      }
    }

    $scope.handleCustomerResponse = function(item) {
      if($scope.cart.user_id === undefined) {
        // Status display
        $scope.progress_class = 'progress-bar-success';
        $scope.progress_text = 'User ' + item.name + ' logged in';
        $scope.user = item;
        CartService.createCartForUserId(item.id)
          .success($scope.handleCreateCartResponse)
          .error($scope.handleCreateCartError);
        //$state.go('selfservice.purchase', {'user_id': item.id, 'user_name': item.name});
      }
      else {
        // Status display
        $scope.progress_class = 'progress-bar-danger';
        $scope.progress_text = 'Error. Another customer is already logged in.';
        return;
      }
    }

    $scope.handleCreateCartResponse = function(item) {
      // TODO: We should do some proper error handling here
      if(item === 'undefined') {
        // Status display
        $scope.progress_class = 'progress-bar-danger';
        $scope.progress_text = 'Error. Received invalid response from backend.';
        return;
      }

      $scope.cart = item;
      // Go to purchase state
      $state.go('selfservice.purchase');

    }

    $scope.handleCreateCartError = function(data, status, headers, config) {
      $scope.progress_class = 'progress-bar-danger';
      $scope.progress_text = 'Error. Could not create a cart.';
    }

    $scope.handleUpdateCartResponse = function(item) {
      // TODO: We should do some proper error handling here
      if(item === 'undefined') {
        // Status display
        $scope.progress_class = 'progress-bar-danger';
        $scope.progress_text = 'Error. Received invalid response from backend.';
        return;
      }

      $scope.cart = item;

    }

    $scope.handleUpdateCartError = function(data, status, headers, config) {
      if(status == 409) {
        $scope.progress_class = 'progress-bar-warning';
        $scope.progress_text = 'Requested product quantity could not be added to your cart. Please check the corrected cart below.';
        $scope.cart = data;
      }
      else {
        $scope.progress_class = 'progress-bar-danger';
        $scope.progress_text = 'Error. Could not update cart.';
      }
    }

    $scope.handlePayCartResponse = function(item) {
      // TODO: We should do some proper error handling here
      if(item === 'undefined') {
        // Status display
        $scope.progress_class = 'progress-bar-danger';
        $scope.progress_text = 'Error. Received invalid response from backend.';
        return;
      }

      $state.go('selfservice.end', {'customerId': $scope.cart.user_id});

    }

    $scope.handlePayCartError = function(data, status, headers, config) {
      $scope.progress_class = 'progress-bar-danger';
      $scope.progress_text = 'Error. Checkout of cart failed.';
    }

    $scope.handleIdentifierError = function(data, status, headers, config) {
      if(status == 404) {
        // Nonexistant identifier status
        $scope.progress_class = 'progress-bar-danger';
        $scope.progress_text = 'Error. Unknown product or customer code.';
      }
    }

    $scope.resetInput = function() {
      $scope.input_text = '';
    }

    $scope.increaseLastQuantity = function() {
      var items = $scope.cart.getAllItems();
      var length = items.length;

      // Increase only if at least one item exists
      if(length == 0) return;

      var last_item = items[length-1];
      var it = new CartItem(last_item.pricing_id, last_item.product_name, 1, last_item.unit_price);
      $scope.cart.addItem(it);
      CartService.updateCart($scope.cart)
        .success($scope.handleUpdateCartResponse)
        .error($scope.handleUpdateCartError);
    }

    // Reset UI and State, e.g. after checkout or when aborting
    $scope.resetState = function() {
      $scope.initialize();
      $state.go('selfservice.start');
    }

    // Initialize scope when calling this controller
    $scope.initialize();


  }]
);
