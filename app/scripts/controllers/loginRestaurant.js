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
                    if(response.status === 200)
                        $window.localStorage['jwtToken'] = response.data.token;
                        $window.localStorage['logged'] = "rest";
                        $window.location.href = '/#/restaurantHome';
                },
                function(error){
                    alert("Incorrect credentials!");
                    $window.location.href = '/#/restaurantLogin';
                    console.log(error);
                }
            );
        }

        vm.redirect = function () {
            $window.location.href = '/';
        }
    }

})();