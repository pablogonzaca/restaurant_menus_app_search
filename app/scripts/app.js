'use strict';

/**
 * @ngdoc overview
 * @name restaurantMenusAppSearchApp
 * @description
 * # restaurantMenusAppSearchApp
 *
 * Main module of the application.
 */
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
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/mapas', {
        templateUrl: 'views/mapas.html',
        controller: 'MapasCtrl',
        controllerAs: 'mapas'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
