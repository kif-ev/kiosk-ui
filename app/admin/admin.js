angular.module('kiosk-ui.admin', [
  'kiosk-ui.config',
  'kiosk-ui.common',
  'ui.router',
  'ui.bootstrap'
])

.config(
  [          '$stateProvider', '$urlRouterProvider',
    function ($stateProvider,   $urlRouterProvider) {

      $stateProvider

        .state('admin', {

          // Only children of this state may be activated, not the state itself
          //abstract: true,

          // Base URL for this state and all substates
          url: '/admin',

          views: {
            '': {
              templateUrl: 'admin/admin.html',
              controller: 'AdminParentController'
            }
          }
        })
    }
  ]
);
