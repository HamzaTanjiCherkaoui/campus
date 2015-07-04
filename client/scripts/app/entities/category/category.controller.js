'use strict';

angular.module('membershipApp')
    .controller('CategoryController', function ($scope, Category, ParseLinks) {
        $scope.categories = [];
        $scope.searchData = {
            page: 1,
            per_page: 10,
            keyword : '',
            orderBy : 'name',
            orderDir : 'ASC'
        };
        $scope.loadAll = function() {
            Category.query({page: $scope.searchData.page, per_page: $scope.searchData.per_page}, function(result, headers) {
                //$scope.links = ParseLinks.parse(headers('link'));
                $scope.categories = result;
            });
        };
        $scope.loadPage = function(page) {
            $scope.searchData.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();

        $scope.create = function () {
            Category.update($scope.category,
                function () {
                    $scope.loadAll();
                    $('#saveCategoryModal').modal('hide');
                    $scope.clear();
                });
        };

        $scope.update = function (id) {
            Category.get({id: id}, function(result) {
                $scope.category = result;
                $('#saveCategoryModal').modal('show');
            });
        };

        $scope.delete = function (id) {
            Category.get({id: id}, function(result) {
                $scope.category = result;
                $('#deleteCategoryConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            Category.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deleteCategoryConfirmation').modal('hide');
                    $scope.clear();
                });
        };        

        $scope.markAll = function (checked) {
            $scope.categories.forEach(function (entity) {
                entity.checked = checked;
            });
        };

        $scope.changeOrder = function (column) {
            $scope.searchData.orderBy = column;
        }

        $scope.clear = function () {
            $scope.category = {name: null, type: null, id: null};
            $scope.editForm.$setPristine();
            $scope.editForm.$setUntouched();
        };
    });
