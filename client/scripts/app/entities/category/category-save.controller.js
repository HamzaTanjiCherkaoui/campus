'use strict';


angular
    .module('membershipApp')
    .controller('CategorySaveController', function ($scope, Category, ParseLinks, $stateParams, $timeout, $state) {

        $scope.isUpdate = !!($stateParams.id);

        $scope.success = null;
        $scope.error = null;
        $scope.doNotMatch = null;

        $scope.load = function (id) {
            Category.get({id: id}, function(result) {
              $scope.entity = result;
            });
        };

        $scope.save = function () {
            var cb = function (data, responseHeaders) {
                $state.go('categoryDetail', {id: data._id});
            };

            if($scope.isUpdate) Category.update({id: $scope.entity._id}, $scope.entity, cb);
            else Category.save($scope.entity, cb);
        };


        $scope.clear = function () {
            $scope.entity = {id : null, name : null, type: null};
             $scope.categoryFrom.$setPristine();
             $scope.categoryFrom.$setUntouched();

            if($scope.isUpdate){
                $scope.load($stateParams.id);
            }
        };

        $timeout($scope.clear);
        
    });
