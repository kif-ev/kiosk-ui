'use strict';

var admin = angular.module('kiosk-ui.admin');

admin.controller('AdminParentController', ['$scope', '$state', 'CartService', 'CartItem', 'Cart', 'Product', 'ProductService', 'Customer', 'IdentifierService',
  function($scope, $state, CartService, CartItem, Cart, Product, ProductService, Customer, IdentifierService) {

    $scope.admin_tabs = [
      {
        heading: 'Admin Home',
        route:   'admin.start',
        disabled: true
      },
      {
        heading: 'Customers',
        route:   'admin.customers'
      },
      {
        heading: 'Products',
        route:   'admin.products'
      }
    ];

  }]
);
