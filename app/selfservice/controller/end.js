'use strict';

var selfservice = angular.module('kiosk-ui.selfservice');

selfservice.controller('SelfserviceEndController', ['$scope','$timeout',
  function($scope, $timeout) {

    function returnToStart() {
      $scope.resetState();
      $state.go('selfservice.start');
    }

    $timeout(returnToStart, 5000);

  }]
);
