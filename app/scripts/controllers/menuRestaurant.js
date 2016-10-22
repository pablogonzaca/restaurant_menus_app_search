(function () {
    'use strict';

    angular
        .module('restaurantMenusAppSearchApp')
        .controller('MenuCtrl', Controller);

    function Controller($window, $scope, $q, $http,$routeParams) {
        var vm = this;

        $scope.id = $routeParams.id;

        vm.init = function () {
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.localStorage['jwtToken'];
            var req = {
                method: 'GET',
                url: 'http://localhost:3000/api/users/menu/' +  $routeParams.id,
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            $http(req).then(
                function (response) {
                    if (response.status === 200){
                        $scope.menus = response.data.menu;
                        $scope.name = response.data.name;
                    }
                },
                function (error) {
                    console.log(error);
                }
            );


        };
        vm.init();
    }

})();