(function () {
    'use strict';

    angular
        .module('restaurantMenusAppSearchApp')
        .controller('HomeRestaurantCtrl', Controller);

    function Controller($scope, $q, $window, $http, $mdDialog) {
        var vm = this;
        vm.display = false;

        angular.extend($scope, {
          center: {
            lat: 0,
            lng: 0,
            zoom: 17
          },
          layers: {
            baselayers: {
                googleHybrid: {
                    name: 'Google Hybrid',
                    layerType: 'HYBRID',
                    type: 'google'
                },
                googleSatellite:{
                    name: 'Google Satellite',
                    layerType: 'SATELLITE',
                    type: 'google'
                },
                // googleRoadmap: {
                //     name: 'Google Streets',
                //     layerType: 'ROADMAP',
                //     type: 'google'
                // },
                // googleTerrain: {
                //     name: 'Google Terrain',
                //     layerType: 'TERRAIN',
                //     type: 'google'
                // },
            }
          },
          markers: {
              m1: {
                  lat: 10.029039113909,
                  lng: -84.09422904253006,
                  icon: {
                    iconUrl: '/images/restaurant.png',
                    iconSize: [32, 37]
                  },
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
          },
          data: {
            email: "",
            password: "",
            nombre: "La cuchara de mi abuela",
            location: {
              latitude: undefined,
              longitude: undefined
            },
            id: "",
            menu: [
              {
                nombre: "",
                precio: "",
                descripcion: "",
                descuento: "",
                comentarios: ["guid1", "guid2", "guid3"],
                puntuaciones: ["guid4", "guid5", "guid6"]
              },
              {},
              {}
            ]
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

        function get_position(ev){
            get_current_position().then(function(value){
              $scope.center = {
                lat: value.coords.latitude,
                lng: value.coords.longitude,
                zoom: 17
              };
            });
        }

        vm.show_options = function(){
          vm.display = false;
        }

        get_position();

        vm.clicks_number = 0;
        vm.longitudes = [];
        vm.latitudes = [];

        $scope.$on('leafletDirectiveMap.click', function(event, wrap){
            if ($scope.center["zoom"] <= 16){
                showPrompt(event, 'You need to expand the map', 'Please zoom up');
            }
            vm.longitudes.push(wrap.leafletEvent.latlng.lng);
            vm.latitudes.push(wrap.leafletEvent.latlng.lat);
            if(vm.longitudes.length === 2 && vm.latitudes.length === 2){
              if(vm.longitudes[0].toString().substring(0, 7) === vm.longitudes[1].toString().substring(0, 7)
                && vm.latitudes[0].toString().substring(0, 5) === vm.latitudes[1].toString().substring(0, 5)){
                showPrompt(event, 'You made click over the same place', 'Here is your restaurant');
                add_marker(
                  vm.longitudes[1].toString().substring(0, 16),
                  vm.latitudes[1].toString().substring(0, 16)
                );
                vm.longitudes = [];
                vm.latitudes = [];
              }
              else{
                showPrompt(event, 'You need to click over the same place, try again', 'Please zoom up and click');
                vm.longitudes = [];
                vm.latitudes = [];
              }
            }

        });

        $scope.$on('leafletDirectiveMarker.click', function(event, wrap){
          console.log('DirectiveMarker lat: ' + wrap.leafletEvent.latlng.lat);
          console.log('DirectiveMarker lng: ' + wrap.leafletEvent.latlng.lng);
        });

        vm.set_location = function(ev){
          vm.display = true;
          showPrompt(ev, 'To choose your location', 'Make 2 clicks over the map');
        }

        function showPrompt(ev, title, message) {
          var confirm = $mdDialog.confirm()
            .title(title)
            .textContent(message)
            .targetEvent(ev)
            .ok('Ok')
            .cancel('Cancel');

          $mdDialog.show(confirm).then(
            function(result) {
            },
            function() {
              vm.display = false;
            }
          );
        };

        function add_marker(longitud, latitud){
          $scope.data.location["long"] = parseFloat(longitud);
          $scope.data.location["lat"] = parseFloat(latitud);
          var marker = {
            lat: parseFloat(latitud),
            lng: parseFloat(longitud),
            icon: {
              iconUrl: '/images/restaurant.png',
              iconSize: [32, 37]
            },
            message: 'Your restaurant'
          };
          $scope.markers[$scope.data.nombre] = marker;
        };

        function update(lat, lon){
            var req = {
                 method: 'PUT',
                 url: 'http://localhost:3000/api/restaurants/' + $scope.data.id,
                 headers: {
                   'Content-Type': 'application/json'
                 },
                 data: {
                    location: {
                      latitude: lat,
                      longitude: lon
                    }
                 },
            }

            $http(req).then(
                function(response){
                    if(response.status === 200)
                        // $window.localStorage['jwtToken'] = response.data.token;
                        $window.location.href = '/#/restaurantHome';
                },
                function(error){
                    // debe ser quitada, linea usada para pruebas en front end
                    $window.location.href = '/#/restaurantHome';
                    console.log(error);
                }
            );
        }


    }

})();