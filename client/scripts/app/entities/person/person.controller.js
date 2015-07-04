'use strict';

angular.module('membershipApp')
    .controller('PersonController', function ($scope, Person, ParseLinks) {
        $scope.persons = [];
        $scope.searchData = {
            page: 1,
            per_page: 4,
            keyword : '',
            orderBy : 'lastName',
            orderDir : 'ASC'
        };
        $scope.loadAll = function() {
            Person.query({page: $scope.searchData.page, per_page: $scope.searchData.per_page}, function(result, headers) {
                //$scope.links = ParseLinks.parse(headers('link'));
                $scope.persons = result;
            });
        };
        $scope.loadPage = function(page) {
            $scope.searchData.page = page;
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

        $scope.markAll = function (checked) {
            $scope.persons.forEach(function (entity) {
                entity.checked = checked;
            });
        };

        $scope.changeOrder = function (column) {
            $scope.searchData.orderBy = column;
        }

        $scope.clear = function () {
            $scope.person = {name: null, type: null, id: null};
            $scope.editForm.$setPristine();
            $scope.editForm.$setUntouched();
        };
    });
