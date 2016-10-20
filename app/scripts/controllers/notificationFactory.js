
(function(){
    'use strict';
    angular.
            module('restaurantMenusAppSearchApp').
            factory('notificationFactory', notificationFactory);

    function notificationFactory($mdDialog) {


        return {
            success: function (text) {
                if (text === undefined) {
                    text = '';
                }

            },
            error: function (text) {
                if (text === undefined) {
                    text = '';
                }

            },
        };
    }
})();