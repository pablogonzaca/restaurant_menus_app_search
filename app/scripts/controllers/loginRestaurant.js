(function () {
    'use strict';

    angular
        .module('restaurantMenusAppSearchApp')
        .controller('LoginRestaurantCtrl', Controller);

    function Controller($window, $http) {
        var vm = this;

        this.login = function(){
            var req = {
                 method: 'POST',
                 url: 'http://localhost:3000/api/restaurants/authenticate',
                 headers: {
                   'Content-Type': 'application/json'
                 },
                 data: {
                    'email': vm.email,
                    'password': vm.password
                }
            }

            $http(req).then(
                function(response){
                    console.log(response);
                    if(response.status === 200)
                        console.log(response.data.token);
                        $window.localStorage['jwtToken'] = response.data.token;
                        $window.location.href = '/#/restaurantHome';
                },
                function(error){
                    // debe ser quitada, linea usada para pruebas en front end
                    $window.location.href = '/#/restaurantHome';
                    console.log(error);
                }
            );
        }

        vm.redirect = function () {
            $window.location.href = '/';
        }
    }

})();