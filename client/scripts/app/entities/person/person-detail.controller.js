'use strict';

angular.module('campusApp')
    .controller('PersonDetailController', function ($scope, $stateParams, Person, Room, Block) {
        $scope.entity = {};
        $scope.load = function (id) {
            Person.get({id: id}, function(result) {
              $scope.entity = result;
            });
        };
        $scope.load($stateParams.id);

        $scope.bookRoom = function(){

        }
    });
