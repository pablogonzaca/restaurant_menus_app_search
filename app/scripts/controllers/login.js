(function () {
    'use strict';

    angular
        .module('restaurantMenusAppSearchApp')
        .controller('LoginCtrl', Controller);

    function Controller($window,$scope) {

        var vm = this;
        
        if($window.localStorage['logged'] == "user"){
            $window.location.href = '/#/userHome';
        }
        if($window.localStorage['logged'] == "rest"){
            $window.location.href = '/#/restaurantHome';
        }
    }

})();