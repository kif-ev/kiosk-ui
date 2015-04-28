angular.module('kiosk-ui.selfservice', [
  'kiosk-ui.common',
  'ui.router'
])

.config(
  [          '$stateProvider', '$urlRouterProvider',
    function ($stateProvider,   $urlRouterProvider) {
      $stateProvider
        //////////////
        // Contacts //
        //////////////
        .state('selfservice', {

          // With abstract set to true, that means this state can not be explicitly activated.
          // It can only be implicitly activated by activating one of its children.
          abstract: true,

          // This abstract state will prepend '/contacts' onto the urls of all its children.
          url: '/selfservice',

          // Example of loading a template from a file. This is also a top level state,
          // so this template file will be loaded and then inserted into the ui-view
          // within index.html.
          templateUrl: 'selfservice/selfservice.html',

          // You can pair a controller to your template. There *must* be a template to pair with.
          controller: ['$scope', '$state',
            function (  $scope,   $state) {

            }]
        })

        /////////////////////
        // Contacts > List //
        /////////////////////

        // Using a '.' within a state name declares a child within a parent.
        // So you have a new state 'list' within the parent 'contacts' state.
        .state('selfservice.start', {

          // Using an empty url means that this child state will become active
          // when its parent's url is navigated to. Urls of child states are
          // automatically appended to the urls of their parent. So this state's
          // url is '/contacts' (because '/contacts' + '').
          url: '',

          // IMPORTANT: Now we have a state that is not a top level state. Its
          // template will be inserted into the ui-view within this state's
          // parent's template; so the ui-view within contacts.html. This is the
          // most important thing to remember about templates.
          templateUrl: 'selfservice/template/start.html',

          controller: 'SelfserviceStartController'
        })
    }
  ]
);
