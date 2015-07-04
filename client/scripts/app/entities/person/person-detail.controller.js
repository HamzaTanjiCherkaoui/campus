'use strict';

angular.module('membershipApp')
    .controller('PersonDetailController', function ($scope, $stateParams, Person) {
        $scope.entity = {};
        $scope.load = function (id) {
            Person.get({id: id}, function(result) {
              $scope.entity = result;
            });
        };
        $scope.load($stateParams.id);
    });
