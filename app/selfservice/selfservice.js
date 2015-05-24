angular.module('kiosk-ui.selfservice', [
  'kiosk-ui.config',
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

          views: {
            '': {
              templateUrl: 'selfservice/selfservice.html',
              controller: 'SelfserviceParentController'
            },
            'statusbar@selfservice': {
              templateUrl: 'selfservice/template/statusbar.html',
              controller: 'SelfserviceStatusbarController'
            }
          }
        })

        .state('selfservice.start', {
          url: '',
          views: {
            '': {
              templateUrl: 'selfservice/template/start.html',
              controller: 'SelfserviceStartController'
            },
            'navbar@selfservice': {
              templateUrl: 'selfservice/template/navbar-start.html'
            }
          }
        })

        .state('selfservice.productinfo', {

          url: '/productinfo/:productId',

          // Template and controller settings
          templateUrl: 'selfservice/template/productinfo.html',
          controller: 'SelfserviceProductinfoController'
        })

        .state('selfservice.purchase', {
          url: '/purchase',
          views: {
            '': {
              templateUrl: 'selfservice/template/purchase.html',
              controller: 'SelfservicePurchaseController'
            },
            'navbar@selfservice': {
              templateUrl: 'selfservice/template/navbar-purchase.html'
            }
          }
        })

        .state('selfservice.end', {

          url: '/end',

          // Template and controller settings
          templateUrl: 'selfservice/template/end.html',
          controller: 'SelfserviceEndController'
        })

    }
  ]
);
