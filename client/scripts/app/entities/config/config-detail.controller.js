'use strict';

angular.module('membershipApp')
    .controller('ConfigDetailController', function ($scope, $stateParams, Config) {
        $scope.config = {};
        $scope.load = function (id) {
            Config.get({id: id}, function(result) {
              $scope.config = result;
            });
        };
        $scope.load($stateParams.id);
    });
