'use strict';

angular.module('jhipsterApp')
    .controller('AllocationController', function ($scope, Allocation, ParseLinks) {
        $scope.allocations = [];
        $scope.page = 1;
        $scope.loadAll = function() {
            Allocation.query({page: $scope.page, perPage: 20}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                $scope.allocations = result;
            });
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();

        $scope.create = function () {
            Allocation.update($scope.allocation,
                function () {
                    $scope.loadAll();
                    $('#saveAllocationModal').modal('hide');
                    $scope.clear();
                });
        };

        $scope.update = function (id) {
            Allocation.get({id: id}, function(result) {
                $scope.allocation = result;
                $('#saveAllocationModal').modal('show');
            });
        };

        $scope.delete = function (id) {
            Allocation.get({id: id}, function(result) {
                $scope.allocation = result;
                $('#deleteAllocationConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            Allocation.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deleteAllocationConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.clear = function () {
            $scope.allocation = {type: null, status: null, id: null};
            $scope.editForm.$setPristine();
            $scope.editForm.$setUntouched();
        };
    });
