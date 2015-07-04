'use strict';

angular.module('jhipsterApp')
    .controller('RoomController', function ($scope, Room, ParseLinks) {
        $scope.rooms = [];
        $scope.page = 1;
        $scope.loadAll = function() {
            Room.query({page: $scope.page, perPage: 20}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                $scope.rooms = result;
            });
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();

        $scope.create = function () {
            Room.update($scope.room,
                function () {
                    $scope.loadAll();
                    $('#saveRoomModal').modal('hide');
                    $scope.clear();
                });
        };

        $scope.update = function (id) {
            Room.get({id: id}, function(result) {
                $scope.room = result;
                $('#saveRoomModal').modal('show');
            });
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
