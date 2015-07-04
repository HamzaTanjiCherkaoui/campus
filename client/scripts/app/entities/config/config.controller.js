'use strict';

angular.module('membershipApp')
    .controller('ConfigController', function ($scope, Config) {
        $scope.configs = [];
        $scope.loadAll = function() {
            Config.query(function(result) {
               $scope.configs = result;
            });
        };
        $scope.loadAll();

        $scope.create = function () {
            Config.update($scope.config,
                function () {
                    $scope.loadAll();
                    $('#saveConfigModal').modal('hide');
                    $scope.clear();
                });
        };

        $scope.update = function (id) {
            Config.get({id: id}, function(result) {
                $scope.config = result;
                $('#saveConfigModal').modal('show');
            });
        };

        $scope.delete = function (id) {
            Config.get({id: id}, function(result) {
                $scope.config = result;
                $('#deleteConfigConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            Config.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deleteConfigConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.clear = function () {
            $scope.config = {key: null, value: null, id: null};
            $scope.editForm.$setPristine();
            $scope.editForm.$setUntouched();
        };
    });
