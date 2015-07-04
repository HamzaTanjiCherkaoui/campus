'use strict';

angular.module('membershipApp')
    .controller('CategoryDetailController', function ($scope, $stateParams, Category) {
        $scope.entity = {};
        $scope.load = function (id) {
            Category.get({id: id}, function(result) {
              $scope.entity = result;
            });
        };
        $scope.load($stateParams.id);
    });
