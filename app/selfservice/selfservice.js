angular.module('kiosk-ui.selfservice', [
  'kiosk-ui.common',
  'ui.router',
  'ui.bootstrap'
])

.config(
  [          '$stateProvider', '$urlRouterProvider',
    function ($stateProvider,   $urlRouterProvider) {

      $stateProvider

        .state('selfservice', {

          // Only children of this state may be activated, not the state itself
          abstract: true,

          // Base URL for this state and all substates
          url: '/selfservice',

          // Wrapper template which is used for all "substates"
          templateUrl: 'selfservice/selfservice.html',

          // Parent controller is active in all child states
          controller: 'SelfserviceParentController'
        })


        .state('selfservice.start', {

          // Make this state the "home" state
          url: '',

          // Template and controller settings
          templateUrl: 'selfservice/template/start.html',
          controller: 'SelfserviceStartController'
        })

        .state('selfservice.productinfo', {

          // Make this state the "home" state
          url: '/productinfo/:productId',

          // Template and controller settings
          templateUrl: 'selfservice/template/productinfo.html',
          controller: 'SelfserviceProductinfoController'
        })
    }
  ]
);
