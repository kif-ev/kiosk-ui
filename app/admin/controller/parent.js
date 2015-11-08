'use strict';

var admin = angular.module('kiosk-ui.admin');

admin.controller('AdminParentController', ['$scope', '$state', 'CartService', 'CartItem', 'Cart', 'Product', 'ProductService', 'Customer', 'IdentifierService', 'AppVersion',
  function($scope, $state, CartService, CartItem, Cart, Product, ProductService, Customer, IdentifierService, AppVersion) {

    $scope.version = AppVersion.version;

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
      },
      {
        heading: 'Transactions',
        route:   'admin.transactions.list'
      },
    ];

  }]
);
