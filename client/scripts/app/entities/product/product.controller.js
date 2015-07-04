'use strict';

angular.module('membershipApp')
    .controller('ProductController', function ($scope, Product, ParseLinks) {
        $scope.products = [];
        $scope.page = 1;
        $scope.loadAll = function() {
            Product.query({page: $scope.page, perPage: 20}, function(result, headers) {
                $scope.products = result;
            });
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
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

         $scope.save = function () {
            var cb = function (data, responseHeaders) {
                $('#deleteProductConfirmation').modal('hide');
            };

            if($scope.isUpdate) Product.update({id: $scope.entity._id}, $scope.entity, cb);
            else Product.save($scope.entity, cb);
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

        $scope.clear = function () {
            $scope.product = {name: null, type: null, quantity: null, available: null, id: null};
            $scope.editForm.$setPristine();
            $scope.editForm.$setUntouched();
        };
    });
