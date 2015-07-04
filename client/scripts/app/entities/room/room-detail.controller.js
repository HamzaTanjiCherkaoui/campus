'use strict';

angular.module('jhipsterApp')
    .controller('RoomDetailController', function ($scope, $stateParams, Room) {
        $scope.room = {};
        $scope.load = function (id) {
            Room.get({id: id}, function(result) {
              $scope.room = result;
            });
        };
        $scope.load($stateParams.id);
    });
