(function () {
    'use strict';

    angular
        .module('restaurantMenusAppSearchApp')
        .controller('HomeUserCtrl', Controller);

    function Controller($window, $scope, $q, $http) {
        var vm = this;
        vm.init = function () {
            get_position();
        };

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
                    googleSatellite: {
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
                    lat: 0,
                    lng: 0,
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


        function add_marker(longitud, latitud) {
            var marker = {
                lat: parseFloat(latitud),
                lng: parseFloat(longitud)
            };
            $scope.markers['location'] = marker;
        }

        function get_current_position() {
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

        function get_position(locations) {
            get_current_position()
                .then(
                function (value) {
                    $scope.center = {
                        lat: value.coords.latitude,
                        lng: value.coords.longitude,
                        zoom: 17
                    };

                    add_marker($scope.center.lng,$scope.center.lat);

                    $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.localStorage['jwtToken'];
                    var req = {
                        method: 'GET',
                        url: 'http://localhost:3000/api/users/restaurants/' + $scope.center.lng + '/' + $scope.center.lat,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    };


                    console.log(req);

                    $http(req).then(
                        function (response) {
                            //if (response.status === 200)
                            //vm.restaurante = response.data;
                            console.log(response.data);
                            //$window.location.href = '/#/userHome';
                        },
                        function (error) {
                            console.log(error);
                        }
                    );


                });
        }
        vm.init();

    }

})();