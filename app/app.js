'use strict';

// Main module and dependencies definition
angular.module('kiosk-ui', [
  'kiosk-ui.selfservice',
  'ui.router',
])

.run(
  [          '$rootScope', '$state', '$stateParams',
    function ($rootScope,   $state,   $stateParams) {

    // Add referencs to $state and $stateParams to the $rootScope for easier access
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    }
  ]
)

.config(
  [          '$stateProvider', '$urlRouterProvider', '$httpProvider',
    function ($stateProvider,   $urlRouterProvider, $httpProvider) {

      // HTTP configuration
      $httpProvider.defaults.headers.common.Authorization = 'Bearer c02b4e4756ecab6837f1954c54ed7a36e1ec6f0bf07984829b39241dfdfdabc8'

      // Redirect all invalid URLs to the default state
      $urlRouterProvider.otherwise('/');

      // Add default application state
      $stateProvider
        .state("home", {
          url: "/",
          template: '<p class="lead">Welcome to the UI-Router Demo</p>' +
            '<p>Use the menu above to navigate. ' +
            'Pay attention to the <code>$state</code> and <code>$stateParams</code> values below.</p>' +
            '<p>Click these links—<a href="#/c?id=1">Alice</a> or ' +
            '<a href="#/user/42">Bob</a>—to see a url redirect in action.</p>'

        })
    }
  ]
);
