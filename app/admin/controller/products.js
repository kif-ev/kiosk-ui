'use strict';

var admin = angular.module('kiosk-ui.admin');

admin.controller('AdminProductsController', ['$scope', '$state', 'Product', 'ProductService', 'IdentifierService',
  function($scope, $state, Product, ProductService, IdentifierService) {

    $scope.products

    $scope.details = function(product) {
      alert(product.id);
    }

    $scope.handleProductsResponse = function(items) {
      $scope.products = items;
    }

    $scope.handleProductsError = function(data, status, headers, config) {
      alert("Something went wrong. I'm sorry.");
    }

    ProductService.getAllProducts()
      .success($scope.handleProductsResponse)
      .error($scope.handleProductsError);


  }]
);
