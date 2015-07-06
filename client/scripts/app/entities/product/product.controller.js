'use strict';

angular.module('membershipApp')
    .controller('ProductController', function ($scope, Product ,Category , cfpLoadingBar) {
       $scope.products = [];
        $scope.pagination = {};
        
        $scope.searchData = {
            page: 1,
            perPage: 4,
            keyword : '',
            category:'',
            orderBy : 'name',
            orderDir : 'asc'
        };
        
        $scope.categories = Category.query();

        $scope.loadAll = function() {

        if($scope.searchData.category==null)    
            $scope.searchData.category='';
            Product.query($scope.searchData, function(result, headers) {
                $scope.products = result;
                var pages = headers('pages');
                $scope.pagination.first = 1;
                $scope.pagination.prev = ($scope.searchData.page > 1 ) ? $scope.searchData.page - 1 : 0;
                $scope.pagination.next = ($scope.searchData.page + 1 <= pages ) ? $scope.searchData.page + 1 : 0;
                $scope.pagination.last = pages;
                
            });
            console.log( $scope.searchData.category);
        };
        $scope.loadPage = function(page) {
            $scope.searchData.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();

         $scope.create = function () {
            if($scope.product._id) {
                console.log('edit');
                Product.update({id: $scope.product._id}, $scope.product, $scope.saveCalback);
            }
            else {
                Product.save($scope.product, $scope.saveCalback);
            }
        };

        $scope.update = function (id) {
            Product.get({id: id}, function(result) {
                $scope.product = result;
                $('#saveProductModal').modal('show');
            });
        };

        $scope.saveCalback = function () {
            $scope.loadAll();
            $('#saveProductModal').modal('hide');
              $('#saveCategoryModal').modal('hide');
            $scope.clear();
        };


        $scope.createCategory = function () {
           
            
                Category.save($scope.category, $scope.saveCalback);
          
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
            $scope.searchData.orderDir = ($scope.searchData.orderDir === 'asc') ? 'desc' : 'asc';
        };

        $scope.clear = function () {
            $scope.product = {name: null, type: null, id: null};
            $scope.editForm.$setPristine();
            $scope.editForm.$setUntouched();
        };

         $scope.start = function() {
      cfpLoadingBar.start();
    };

    $scope.complete = function () {
      cfpLoadingBar.complete();
    }
    });
