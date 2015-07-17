'use strict';

angular.module('campusApp')
    .controller('PersonDetailController', function ($scope, $stateParams, Person) {
        $scope.entity = {};
        $scope.load = function (id) {
            Person.get({id: id}, function(result) {
              $scope.entity = result;
              $scope.entity.reservation = result.reservations.pop();
            });
        };
        $scope.load($stateParams.id);
    });
