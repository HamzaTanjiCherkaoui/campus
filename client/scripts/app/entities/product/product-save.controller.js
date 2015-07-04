'use strict';


angular
    .module('membershipApp')
    .controller('ProductSaveController', function ($scope, Product, ParseLinks, $stateParams, $timeout, $state) {

        $scope.isUpdate = !!($stateParams.id);

        $scope.success = null;
        $scope.error = null;
        $scope.doNotMatch = null;

        $scope.load = function (id) {
            Product.get({id: id}, function(result) {
              $scope.entity = result;
            });
        };

        $scope.save = function () {
            var cb = function (data, responseHeaders) {
                $state.go('productDetail', {id: data._id});
            };

            if($scope.isUpdate) Product.update({id: $scope.entity._id}, $scope.entity, cb);
            else Product.save($scope.entity, cb);
        };


        $scope.clear = function () {
            $scope.entity = {id : null, name : null, type: null};
             $scope.productFrom.$setPristine();
             $scope.productFrom.$setUntouched();

            if($scope.isUpdate){
                $scope.load($stateParams.id);
            }
        };

        $timeout($scope.clear);
        
    });
