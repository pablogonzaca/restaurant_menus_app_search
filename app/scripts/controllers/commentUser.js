(function(){
	'use strict';
	angular
        .module('restaurantMenusAppSearchApp')
        .controller('CommentUserCtrl', Controller);
		
	function Controller($window, $mdDialog, $http,$routeParams) {
        alert($routeParams.id);
		var vm = this;
		vm.comment="";
		vm.submit=function (){
			var req= {
                 method: 'GET',
                 url: 'http://localhost:3000/api/users/comment',
                 headers: {
                   'Content-Type': 'application/json'
                 },
                 data: {
                    'comment': vm.comment,
					'restaurant': $routeParams.id
                }
            };
			$http(req).then(
                function(response){
                    if(response.status === 200)
                        $window.location.href = '/#/commentUser';
                },
                function(error){
                    console.log(error);
                }
            );
		};		
	};
})();