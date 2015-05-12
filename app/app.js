'use strict';

// Main module and dependencies definition
angular.module('kiosk-ui', [
  'kiosk-ui.config',
  'kiosk-ui.common',
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
  [          '$stateProvider', '$urlRouterProvider', '$httpProvider', 'AppConfig',
    function ($stateProvider,   $urlRouterProvider, $httpProvider, AppConfig) {

      // HTTP configuration
      $httpProvider.defaults.headers.common.Authorization = AppConfig.token;

      // Redirect all invalid URLs to the default state
      $urlRouterProvider.otherwise('/');

      // Add default application state
      $stateProvider
        .state("home", {
          url: "/",
          template: ''
        })
    }
  ]
);
