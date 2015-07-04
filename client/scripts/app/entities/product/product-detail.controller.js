'use strict';

angular.module('jhipsterApp')
    .controller('ProductDetailController', function ($scope, $stateParams, Product) {
        $scope.product = {};
        $scope.load = function (id) {
            Product.get({id: id}, function(result) {
              $scope.product = result;
            });
        };
        $scope.load($stateParams.id);
    });
