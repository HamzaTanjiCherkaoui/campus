'use strict';

angular.module('membershipApp')
    .controller('RoomController', function ($scope, Room, Block) {
        $scope.rooms = [];
        $scope.pagination = {};
        $scope.searchData = {
            page: 1,
            perPage: 4,
            keyword : '',
            orderBy : 'name',
            orderDir : 'asc'
        };
        $scope.blocks = Block.query();
        $scope.loadAll = function() {
            Room.query($scope.searchData, function(result, headers) {
                $scope.rooms = result;
                var pages = headers('pages');
                $scope.pagination.first = 1;
                $scope.pagination.prev = ($scope.searchData.page > 1 ) ? $scope.searchData.page - 1 : 0;
                $scope.pagination.next = ($scope.searchData.page + 1 <= pages ) ? $scope.searchData.page + 1 : 0;
                $scope.pagination.last = pages;
            });
        };
        $scope.loadPage = function(page) {
            $scope.searchData.page = page;
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

        $scope.changeOrder = function (column) {
            $scope.searchData.orderBy = column;
            $scope.searchData.orderDir = ($scope.searchData.orderDir === 'asc') ? 'desc' : 'asc';
        }

        $scope.clear = function () {
            $scope.room = {_id: null, name: null, floor: null, capacity: null, free: null, block: null};
            $scope.editForm.$setPristine();
            $scope.editForm.$setUntouched();
        };
    });
