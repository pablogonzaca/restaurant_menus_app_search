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
            'leaflet-directive',
            'ngMaterial'
        ])
        .config(config);

    function config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'vm'
            })
            .when('/mapas', {
                templateUrl: 'views/mapas.html',
                controller: 'MapasCtrl',
                controllerAs: 'vm'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl',
                controllerAs: 'vm'
            })
            .when('/userLogin', {
                templateUrl: 'views/loginUser.html',
                controller: 'LoginUserCtrl',
                controllerAs: 'vm'
            })
            .when('/restaurantLogin', {
                templateUrl: 'views/loginRestaurant.html',
                controller: 'LoginRestaurantCtrl',
                controllerAs: 'vm'
            })
            .when('/userRegister', {
                templateUrl: 'views/registerUser.html',
                controller: 'RegisterUserCtrl',
                controllerAs: 'vm'
            })
            .when('/restaurantRegister', {
                templateUrl: 'views/registerRestaurant.html',
                controller: 'RegisterRestaurantCtrl',
                controllerAs: 'vm'
            })
            .when('/userHome', {
                templateUrl: 'views/homeUser.html',
                controller: 'HomeUserCtrl',
                controllerAs: 'vm'
            })
            .when('/restaurantHome', {
                templateUrl: 'views/homeRestaurant.html',
                controller: 'HomeRestaurantCtrl',
                controllerAs: 'vm'
            })
            .when('/logOut', {
                templateUrl: 'views/homeRestaurant.html',
                controller: 'LogoutCtrl',
                controllerAs: 'vm'
            })
            .otherwise({
                redirectTo: '/'
            });
    }


})();


