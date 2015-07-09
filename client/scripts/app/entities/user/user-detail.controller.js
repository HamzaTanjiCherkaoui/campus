'use strict';

angular.module('campusApp')
    .controller('UserDetailController', ['$scope', '$stateParams', 'User', function ($scope, $stateParams, User) {
        $scope.entity = {};
        $scope.load = function (id) {
            User.get({id: id}, function(result) {
              	$scope.entity = result;
            });
        };
        $scope.load($stateParams.id);
        $scope.barecode = function(code, $event){
        	$event.target.barcode(code, 'codabar');   
        };
    }]);
