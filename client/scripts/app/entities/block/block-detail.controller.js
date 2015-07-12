'use strict';

angular.module('campusApp')
    .controller('BlockDetailController', function ($scope, $stateParams, Block) {
        $scope.block = {};
        $scope.load = function (id) {
            Block.get({id: id}, function(result) {
              $scope.block = result;
              $scope.block.count = $scope.block.rooms.length;
              $scope.dataRooms = Array.apply(null, Array($scope.block.floors)).map(function () {return {number:0, rooms: []};});
              $scope.block.rooms.forEach(function(room){
                $scope.dataRooms[room.floor].rooms.push(room);
                $scope.dataRooms[room.floor].number = room.floor;
              });

            });
        };
        $scope.load($stateParams.id);
    });
