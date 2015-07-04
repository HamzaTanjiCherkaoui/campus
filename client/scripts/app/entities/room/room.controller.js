'use strict';

angular.module('membershipApp')
    .controller('RoomController', function ($scope, Room) {
        $scope.rooms = [];
        $scope.page = 1;
        $scope.loadAll = function() {
            Room.query({page: $scope.page, perPage: 20}, function(result) {
                $scope.rooms = result;
            });
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();

        $scope.create = function () {
            if($scope.room._id) {
                console.log('edit');
                Room.update({id: $scope.room._id}, $scope.room, $scope.saveCalback);
            }
            else {
                Room.save($scope.room, $scope.saveCalback);
            }
        };

        $scope.update = function (id) {
            Room.get({id: id}, function(result) {
                $scope.room = result;
                $('#saveRoomModal').modal('show');
            });
        };

        $scope.saveCalback = function () {
            $scope.loadAll();
            $('#saveRoomModal').modal('hide');
            $scope.clear();
        };

        $scope.delete = function (id) {
            Room.get({id: id}, function(result) {
                $scope.room = result;
                $('#deleteRoomConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            Room.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deleteRoomConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.clear = function () {
            $scope.room = {name: null, floor: null, capacity: null, free: null, gener: null, id: null};
            $scope.editForm.$setPristine();
            $scope.editForm.$setUntouched();
        };
    });
