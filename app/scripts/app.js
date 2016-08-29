'use strict';

(function () {
    'use strict';

    angular
        .module('restaurantMenusAppSearchApp', [
          'ngAnimate',
          'ngCookies',
          'ngResource',
          'ngRoute',
          'ngSanitize',
          'ngTouch',
          'leaflet-directive'
        ])
        .config(config)
        .run(run);

    function config($routeProvider) {
      $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        data: { activeTab: 'main' }
      })
      .when('/mapas', {
        templateUrl: 'views/mapas.html',
        controller: 'MapasCtrl',
        controllerAs: 'mapas',
        data: { activeTab: 'mapas' }
      })
      .when('/account', {
        templateUrl: 'views/account.html',
        controller: 'AccountCtrl',
        controllerAs: 'account',
        data: { activeTab: 'account' }
      })
      .otherwise({
        redirectTo: '/'
      });
    }

    function run($http, $rootScope, $window) {
        // add JWT token as default auth header
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.jwtToken;

        // update active tab on state change
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.activeTab = toState.data.activeTab;
        });
    }

    // manually bootstrap angular after the JWT token is retrieved from the server
    $(function () {
        // get JWT token from server
        $.get('/app/token', function (token) {
            window.jwtToken = token;

            angular.bootstrap(document, ['restaurantMenusAppSearchApp']);
        });
    });
})();


