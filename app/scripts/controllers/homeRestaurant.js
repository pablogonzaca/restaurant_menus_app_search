(function () {
        'use strict';

        angular
            .module('restaurantMenusAppSearchApp')
            .controller('HomeRestaurantCtrl', Controller);

        function Controller($scope, $q, $window, $http, $mdDialog, NgTableParams) {
            var vm = this;
            vm.display = false;

            vm.init = function () {
                $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.localStorage['jwtToken'];
                var req = {
                    method: 'GET',
                    url: 'http://localhost:3000/api/restaurants/current',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }

                $http(req).then(
                    function (response) {
                        if (response.status === 200)
                            vm.restaurante = response.data;
                        console.log(vm.restaurante);
                        $window.location.href = '/#/restaurantHome';
                    },
                    function (error) {
                        console.log(error);
                    }
                );
            }

            vm.init();

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
                        lat: 10.029039113909,
                        lng: -84.09422904253006,
                        icon: {
                            iconUrl: '/images/Restaurant.png',
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
                }
            });


            vm.restaurante = {};
            // {
            //     email: "",
            //     password: "",
            //     name: "La cuchara de mi abuela",
            //     location: {
            //       latitude: undefined,
            //       longitude: undefined
            //     },
            //     _id: "",
            //     menu: [
            //       {
            //         name: "casado",
            //         precio: "2500",
            //         descripcion: "a cachete",
            //         descuento: "12%",
            //         imagen: "",
            //         comentarios: ["guid1", "guid2", "guid3"],
            //         puntuaciones: ["guid4", "guid5", "guid6"]
            //       }
            //     ]
            // }

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

            function get_position(ev) {
                get_current_position().then(function (value) {
                    $scope.center = {
                        lat: value.coords.latitude,
                        lng: value.coords.longitude,
                        zoom: 17
                    };
                });
            }

            vm.show_options = function () {
                vm.display = false;
            }

            get_position();

            vm.clicks_number = 0;
            vm.longitudes = [];
            vm.latitudes = [];

            $scope.$on('leafletDirectiveMap.click', function (event, wrap) {
                if ($scope.center["zoom"] <= 16) {
                    showPrompt(event, 'You need to expand the map', 'Please zoom up');
                }
                vm.longitudes.push(wrap.leafletEvent.latlng.lng);
                vm.latitudes.push(wrap.leafletEvent.latlng.lat);
                if (vm.longitudes.length === 2 && vm.latitudes.length === 2) {
                    if (vm.longitudes[0].toString().substring(0, 7) === vm.longitudes[1].toString().substring(0, 7)
                        && vm.latitudes[0].toString().substring(0, 5) === vm.latitudes[1].toString().substring(0, 5)) {
                        showPrompt(event, 'You made click over the same place', 'Here is your restaurant');
                        add_marker(
                            vm.longitudes[1].toString().substring(0, 16),
                            vm.latitudes[1].toString().substring(0, 16)
                        );
                        vm.longitudes = [];
                        vm.latitudes = [];
                    }
                    else {
                        showPrompt(event, 'You need to click over the same place, try again', 'Please zoom up and click');
                        vm.longitudes = [];
                        vm.latitudes = [];
                    }
                }
            });

            $scope.$on('leafletDirectiveMarker.click', function (event, wrap) {
                console.log('DirectiveMarker lat: ' + wrap.leafletEvent.latlng.lat);
                console.log('DirectiveMarker lng: ' + wrap.leafletEvent.latlng.lng);
            });

            vm.set_location = function (ev) {
                console.log(JSON.stringify(vm.restaurante));
                console.log(vm.restaurante.location.latitude);
                if (vm.restaurante.location.latitude && vm.restaurante.location.longitude) {
                    var marker = {
                        lat: vm.restaurante.location.latitude,
                        lng: vm.restaurante.location.longitude,
                        icon: {
                            iconUrl: '/images/Restaurant.png',
                            iconSize: [32, 37]
                        },
                        message: vm.restaurante.name
                    };
                    $scope.markers[vm.restaurante.name] = marker;
                    vm.display = true;
                    showPrompt(ev, 'To change your location', 'Make 2 clicks over the map');
                } else {
                    vm.display = true;
                    showPrompt(ev, 'To choose your location', 'Make 2 clicks over the map');
                }
            }

            function showPrompt(ev, title, message) {
                var confirm = $mdDialog.confirm()
                    .title(title)
                    .textContent(message)
                    .targetEvent(ev)
                    .ok('Ok')
                    .cancel('Cancel');

                $mdDialog.show(confirm).then(
                    function (result) {
                    },
                    function () {
                        vm.display = false;
                    }
                );
            };

            function add_marker(longitud, latitud) {
                vm.restaurante.location.longitude = parseFloat(longitud);
                vm.restaurante.location.latitude = parseFloat(latitud);
                var marker = {
                    lat: parseFloat(latitud),
                    lng: parseFloat(longitud),
                    icon: {
                        iconUrl: '/images/Restaurant.png',
                        iconSize: [32, 37]
                    },
                    message: vm.restaurante.name
                };
                $scope.markers[vm.restaurante.name] = marker;
                updateRestaurant();
            };

            vm.display_menus = false;
            vm.add_or_update_menu = function () {
                vm.display_menus = true;
            }

            var isNameDuplicated = function (itemName) {
                return vm.restaurante.menu.some(function (entry) {
                    return entry.name.toUpperCase() == itemName.toUpperCase();
                });
            };

            vm.restaurante.menu = vm.restaurante.menu;
            // the item being added
            vm.newItem = {"name": "", "precio": "", "descuento": "", "descripcion": ""};
            // indicates if the view is being loaded
            vm.loading = true;
            // indicates if the view is in add mode
            vm.addMode = false;
            // Toggle the grid between add and normal mode
            vm.toggleAddMode = function () {
                vm.addMode = !vm.addMode;
            };

            // Toggle an item between normal and edit mode
            vm.toggleEditMode = function (item) {
                // Toggle
                item.editMode = !item.editMode;
                console.log(item);

                // if item is not in edit mode anymore
                if (!item.editMode) {
                    // Restore name
                    item.name = item.serverName;
                } else {
                    // save server name to restore it if the user cancel edition
                    item.serverName = item.name;

                    // Set edit mode = false and restore the name for the rest of items in edit mode
                    // (there should be only one)
                    vm.restaurante.menu.forEach(function (i) {
                        // item is not the item being edited now and it is in edit mode
                        if (item.id != i.id && i.editMode) {
                            // Restore name
                            i.name = i.serverName;
                            i.editMode = false;
                        }
                    });
                }
            };

            // Creates the 'newItem' on the server
            vm.createItem = function () {
                // Check if the item is already on the list
                var duplicated = isNameDuplicated(vm.newItem.name);
                if (!duplicated) {
                    vm.restaurante.menu.unshift(vm.newItem);
                    vm.newItem = {"name": "", "precio": "", "descuento": "", "descripcion": ""};
                    updateRestaurant();
                    vm.addMode = !vm.addMode;
                } else {
                    // notification.error("El platillo ya existe.");
                }
            }

            // Gets an item from the server using the id
            vm.readItem = function (itemId) {
                knownItemsFactory.get({id: itemId}, requestSuccess, requestError);
            }

            // Updates an item
            vm.updateItem = function (item) {
                item.editMode = false;
                var index = -1;
                for (var i = 0; i < vm.restaurante.menu.length; i++) {
                    if (vm.restaurante.menu[i]["name"] == item["name"]) {
                        index = i;
                    }
                }
                var object = vm.restaurante.menu[index];
                for (var x in item) {
                    object[x] = item[x];
                }
                vm.restaurante.menu[index] = item;
                updateRestaurant();
            }

            // Deletes an item
            vm.deleteItem = function (item) {
                var index = vm.restaurante.menu.indexOf(item);
                vm.restaurante.menu.splice(index, 1);
            }

            // In edit mode, if user press ENTER, update item
            vm.updateOnEnter = function (item, args) {
                // if key is enter
                if (args.keyCode == 13) {
                    vm.updateItem(item);
                    // remove focus
                    args.target.blur();
                }
            };

            // In add mode, if user press ENTER, add item
            vm.saveOnEnter = function (item, args) {
                // if key is enter
                if (args.keyCode == 13) {
                    vm.createItem();
                    // remove focus
                    args.target.blur();
                }
            };

            function updateRestaurant() {
                $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.localStorage['jwtToken'];
                var req = {
                    method: 'PUT',
                    url: 'http://localhost:3000/api/restaurants/' + vm.restaurante._id,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: vm.restaurante
                }

                $http(req).then(function (response) {
                    console.log(response);
                    if (response.status === 200)
                        console.log(response.data);
                }, function (error) {
                    console.log(error);
                });
            }

        }
    })();