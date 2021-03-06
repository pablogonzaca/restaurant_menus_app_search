(function () {
    'use strict';

    angular
        .module('restaurantMenusAppSearchApp')
        .controller('LoginUserCtrl', Controller);

    function Controller($window, $http) {
        var vm = this;
        vm.email = "";
        vm.password = "";

        vm.redirect = function () {
            $window.location.href = '/';
        }

        this.login = function () {
            var req = {
                method: 'POST',
                url: 'http://localhost:3000/api/users/authenticate',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    'name': vm.username,
                    'email': vm.email,
                    'password': vm.password
                }
            }

            $http(req).then(
                function (response) {
                    if (response.status === 200)
                        console.log(response.data.token);
                    $window.localStorage['jwtToken'] = response.data.token;
                    $window.localStorage['logged'] = "user";
                    $window.location.href = '/#/userHome';
                },
                function (error) {
                    alert("Credenciales incorrectos");
                    // console.log(error);
                }
            );
        }

    }

})();