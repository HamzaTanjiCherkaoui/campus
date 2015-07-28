'use strict';

angular.module('campusApp')
    .controller('ProductDetailController', function ($scope, $stateParams, Product, Allocation) {
        $scope.product = {};
        $scope.load = function (id) {
            Product.get({id: id}, function(result) {
                $scope.product = result;
                Allocation.get({id: result.allocation}, function(result) {
                    $scope.product.allocation = result;
                });
            });
        };
        $scope.load($stateParams.id);
    });
