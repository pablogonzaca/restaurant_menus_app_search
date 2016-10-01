(function () {
    'use strict';

    angular
        .module('restaurantMenusAppSearchApp')
        .controller('RegisterUserCtrl', Controller);

    function Controller($window, $http) {
        var vm = this;
        vm.confirm_password = "";
        vm.password = "";
        vm.username = "";
        vm.email = "";

        vm.alertDialog = function() {
            if(vm.confirm_password === vm.password){
                $mdDialog.show(
                  $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('Opening from the left')
                    .textContent('Closing to the right!')
                    .ariaLabel('Left to right demo')
                    .ok('Nice!')
                );
            }
        };

        vm.submit = function(){
            var req = {
                 method: 'POST',
                 url: 'http://localhost:3000/api/users/register',
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
                function(response){
                    if(response.status === 200)
                        $window.location.href = '/#/userLogin';
                },
                function(error){
                    console.log(error);
                }
            );
        };
    }

})();