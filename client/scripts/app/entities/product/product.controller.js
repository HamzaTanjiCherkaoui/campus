'use strict';

angular.module('membershipApp')
    .controller('ProductController', function ($scope, Product, ParseLinks) {
        $scope.products = [];
        $scope.searchData = {
            page: 1,
            per_page: 10,
            keyword : '',
            orderBy : 'name',
            orderDir : 'ASC'
        };
        $scope.loadAll = function() {
            Product.query({page: $scope.searchData.page, per_page: $scope.searchData.per_page}, function(result, headers) {
                //$scope.links = ParseLinks.parse(headers('link'));
                $scope.products = result;
            });
        };
        $scope.loadPage = function(page) {
            $scope.searchData.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();

        $scope.create = function () {
            Product.update($scope.product,
                function () {
                    $scope.loadAll();
                    $('#saveProductModal').modal('hide');
                    $scope.clear();
                });
        };

        $scope.update = function (id) {
            Product.get({id: id}, function(result) {
                $scope.product = result;
                $('#saveProductModal').modal('show');
            });
        };

        $scope.delete = function (id) {
            Product.get({id: id}, function(result) {
                $scope.product = result;
                $('#deleteProductConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            Product.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deleteProductConfirmation').modal('hide');
                    $scope.clear();
                });
        };        

        $scope.markAll = function (checked) {
            $scope.products.forEach(function (entity) {
                entity.checked = checked;
            });
        };

        $scope.changeOrder = function (column) {
            $scope.searchData.orderBy = column;
        }

        $scope.clear = function () {
            $scope.product = {name: null, type: null, id: null};
            $scope.editForm.$setPristine();
            $scope.editForm.$setUntouched();
        };
    });
