'use strict';

angular.module('membershipApp')
    .controller('ProductDetailController', function ($scope, $stateParams, Product) {
        $scope.entity = {};
        $scope.load = function (id) {
            Product.get({id: id}, function(result) {
              $scope.entity = result;
            });
        };
        $scope.load($stateParams.id);
    });
