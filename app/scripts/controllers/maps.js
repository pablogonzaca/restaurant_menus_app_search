'use strict';

angular.module('restaurantMenusAppSearchApp')
  .controller('MapasCtrl', ['$scope', '$q', '$window', '$http',
    function ($scope, $q, $window, $http) {

      angular.extend($scope, {
          center: {
            lat: 0,
            lng: 0,
            zoom: 16
          },
          layers: {
            baselayers: {
                googleTerrain: {
                    name: 'Google Terrain',
                    layerType: 'TERRAIN',
                    type: 'google'
                },
                googleHybrid: {
                    name: 'Google Hybrid',
                    layerType: 'HYBRID',
                    type: 'google'
                },
                googleRoadmap: {
                    name: 'Google Streets',
                    layerType: 'ROADMAP',
                    type: 'google'
                }
            }
          },
          markers: {
              m1: {
                  lat: 10.029039113909,
                  lng: -84.09422904253006,
                  message: 'My house'
              }
          },
          defaults: {
            scrollWheelZoom: false
          },
          events: {
            map: {
                enable: ['click'],
                logic: 'emit'
            }
        }
      });

      function get_current_position(){
        var deferred = $q.defer();
        if (!$window.navigator.geolocation) {
            deferred.reject('Geolocation not supported.');
        } else {
            $window.navigator.geolocation.getCurrentPosition(
                function (position) {
                    deferred.resolve(position);
                },
                function (err) {
                    deferred.reject(err);
                });
        }
        return deferred.promise;
      }

      function get_position(){
        get_current_position().then(function(value){
          console.log(value);
          $scope.center = {
            lat: value.coords.latitude,
            lng: value.coords.longitude,
            zoom: 16
          };
        });
      }

      get_position();

      $scope.$on('leafletDirectiveMap.click', function(event, wrap){
          console.log('DirectiveMap lat: ' + wrap.leafletEvent.latlng.lat);
          console.log('DirectiveMap lng: ' + wrap.leafletEvent.latlng.lng);
      });

      $scope.$on('leafletDirectiveMarker.click', function(event, wrap){
          console.log('DirectiveMarker lat: ' + wrap.leafletEvent.latlng.lat);
          console.log('DirectiveMarker lng: ' + wrap.leafletEvent.latlng.lng);
      });

  }]);