'use strict';

var admin = angular.module('kiosk-ui.admin');

admin.controller('AdminParentController', ['$scope', '$state', 'CartService', 'CartItem', 'Cart', 'Product', 'ProductService', 'Customer', 'IdentifierService',
  function($scope, $state, CartService, CartItem, Cart, Product, ProductService, Customer, IdentifierService) {

    $scope.admin_tabs = [
      {
        heading: 'Identifier Search',
        route:   'admin.search'
      },
      {
        heading: 'Customers',
        route:   'admin.customers.list'
      },
      {
        heading: 'Products',
        route:   'admin.products'
      }
    ];

  }]
);
