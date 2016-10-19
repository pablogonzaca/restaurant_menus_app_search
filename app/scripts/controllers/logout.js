(function () {
    'use strict';

    angular
        .module('restaurantMenusAppSearchApp')
        .controller('LogoutCtrl', Controller);

    function Controller($window) {
        var vm = this;
        $window.localStorage['jwtToken'] = undefined;
        $window.localStorage['logged'] = undefined;
        $window.location.href = '/#/';
    }

})();