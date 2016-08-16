'use strict';

angular.module('restaurantMenusAppSearchApp')
  .controller('MapasCtrl', ['$scope', '$http',
    function ($scope, $http) {

      angular.extend($scope, {
          center: {
            lat: 0,
            lng: 0,
            zoom: 17
          }
      });

      function getPosition(){
        $http.get('http://jsonip.com').success(function(res) {

            var url = 'http://freegeoip.net/json/' + res.ip;
            $http.get(url).success(function(res) {
              $scope.center = {
                lat: res.latitude,
                lng: res.longitude,
                zoom: 18
              };
            });
        });
      }

      getPosition();

  }]);