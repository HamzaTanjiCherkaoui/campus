'use strict';

angular.module('membershipApp')
    .controller('BlockController', function ($scope, Block) {
        $scope.blocks = [];
        $scope.loadAll = function() {
            Block.query(function(result) {
               $scope.blocks = result;
            });
        };
        $scope.loadAll();

        $scope.create = function () {
            Block.update($scope.block,
                function () {
                    $scope.loadAll();
                    $('#saveBlockModal').modal('hide');
                    $scope.clear();
                });
        };

        $scope.update = function (id) {
            Block.get({id: id}, function(result) {
                $scope.block = result;
                $('#saveBlockModal').modal('show');
            });
        };

        $scope.delete = function (id) {
            Block.get({id: id}, function(result) {
                $scope.block = result;
                $('#deleteBlockConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            Block.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deleteBlockConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.clear = function () {
            $scope.block = {name: null, type: null, floors: null, id: null};
            $scope.editForm.$setPristine();
            $scope.editForm.$setUntouched();
        };
    });
