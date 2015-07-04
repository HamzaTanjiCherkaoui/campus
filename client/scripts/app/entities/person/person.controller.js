'use strict';

angular.module('membershipApp')
    .controller('PersonController', function ($scope, Person, ParseLinks) {
        $scope.persons = [];
        $scope.page = 1;
        $scope.loadAll = function() {
            Person.query({page: $scope.page, per_page: 20}, function(result, headers) {
                //$scope.links = ParseLinks.parse(headers('link'));
                $scope.persons = result;
            });
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();

        $scope.create = function () {
            Person.update($scope.person,
                function () {
                    $scope.loadAll();
                    $('#savePersonModal').modal('hide');
                    $scope.clear();
                });
        };

        $scope.update = function (id) {
            Person.get({id: id}, function(result) {
                $scope.person = result;
                $('#savePersonModal').modal('show');
            });
        };

        $scope.delete = function (id) {
            Person.get({id: id}, function(result) {
                $scope.person = result;
                $('#deletePersonConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            Person.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deletePersonConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.clear = function () {
            $scope.person = {name: null, type: null, id: null};
            $scope.editForm.$setPristine();
            $scope.editForm.$setUntouched();
        };
    });
