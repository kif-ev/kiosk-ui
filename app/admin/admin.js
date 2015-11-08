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
          abstract: true,

          // Base URL for this state and all substates
          url: '/admin',

          views: {
            '': {
              templateUrl: 'admin/admin.html',
              controller: 'AdminParentController'
            }
          }
        })

        .state('admin.start', {

          // Base URL for this state and all substates
          url: '',

          views: {
            '': {
              templateUrl: 'admin/template/start.html'
            }
          }
        })

        .state('admin.search', {

          // Base URL for this state and all substates
          url: '/search',

          views: {
            '': {
              templateUrl: 'admin/template/search.html',
              controller: 'AdminSearchController'
            }
          }
        })

        .state('admin.customers', {

          // Base URL for this state and all substates
          url: '/customers',
          abstract: true,

          views: {
            '': {
              templateUrl: 'admin/template/customers.html',
              controller: 'AdminCustomersController'
            }
          }
        })

        .state('admin.customers.list', {

          // Base URL for this state and all substates
          url: '',

          views: {
            '': {
              templateUrl: 'admin/template/customer-list.html',
              controller: 'AdminCustomerListController'
            }
          }
        })

        .state('admin.customers.details', {

          // Base URL for this state and all substates
          url: '/:customerId',

          views: {
            '': {
              templateUrl: 'admin/template/customer-details.html',
              controller: 'AdminCustomerDetailsController'
            }
          }
        })

        .state('admin.customers.deposit', {

          // Base URL for this state and all substates
          url: '/:customerId/deposit',

          views: {
            '': {
              templateUrl: 'admin/template/customer-deposit.html',
              controller: 'AdminCustomerDepositController'
            }
          }
        })

        .state('admin.products', {

          // Base URL for this state and all substates
          url: '/products',

          views: {
            '': {
              templateUrl: 'admin/template/products.html',
              controller: 'AdminProductsController'
            }
          }
        })

        .state('admin.transactions', {

          // Base URL for this state and all substates
          url: '/transactions',
          abstract: true,

          views: {
            '': {
              templateUrl: 'admin/template/transactions.html',
              controller: 'AdminTransactionsController'
            }
          }
        })

        .state('admin.transactions.list', {

          // Base URL for this state and all substates
          url: '?userId',

          views: {
            '': {
              templateUrl: 'admin/template/transaction-list.html',
              controller: 'AdminTransactionListController'
            }
          }
        })
    }
  ]
);
