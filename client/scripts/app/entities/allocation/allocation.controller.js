'use strict';

angular.module('campusApp')
    .controller('AllocationController', function ($scope, Allocation, ParseLinks ,$stateParams,Product,Person) {
        $scope.allocations = [];
        $scope.allocation={};
        $scope.allocation.product={};
        $scope.productnotfilled=true;
        $scope.done=false;
         $scope.products = [];
        $scope.page = 1;
         $scope.persons = [];
            $scope.pagination = {};
            $scope.searchData = {
            page: 1,
            perPage: 4,
            keyword : '',
            orderBy : 'lastName',
            orderDir : 'asc'
        };
          
          
        $scope.searchData2 = {
            page: 1,
            perPage: 4,
            keyword : '',
            category:'',
            orderBy : 'name',
            orderDir : 'asc'
        };
         
          
                Person.query($scope.searchData, function(result, headers) {
                $scope.persons = result;
                
                
                });
               

        $scope.loadAll = function() {
              Product.query($scope.searchData2, function(result2, headers2) {
                $scope.products = result2;
                
                
                });
            Allocation.query( function(result, headers) {
                
                $scope.allocations = result;
                
                if($stateParams.idproduct && $scope.done==false )
        {
                 $scope.productnotfilled=false;
                  Product.get({id: $stateParams.idproduct}, function(result2) {
                    $scope.product = result2;
                    });
                $scope.allocation.product = $stateParams.idproduct;
                $('#saveAllocationModal').modal('show');
       

        } 
            });
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();

            $scope.create = function () {
            if($scope.allocation._id) {
                console.log('edit');
                 Product.get({id: $scope.allocation.product}, function(result2) {
                    $scope.product = result2;
                    var product=$scope.product;
                     product.isalloced=true;
                    //update the product
                    Product.update({id: product._id},product);
                    });
                Allocation.update({id: $scope.allocation._id}, $scope.allocation, $scope.saveCalback);
            }
            else {
                $scope.productnotfilled=true;
                $scope.done=true;
                if($scope.done)
                {
                    Product.get({id: $scope.allocation.product}, function(result2) {
                    $scope.product = result2;
                    var product=$scope.product;
                     product.isalloced=true;
                    //update the product
                    Product.update({id: product._id},product);
                    });
                }
                
               
                $('#saveAllocationModal').modal('hide');
                Allocation.save($scope.allocation, $scope.saveCalback);


            }
        };
      
        $scope.update = function (id) {
            Allocation.get({id: id}, function(result) {
                $scope.allocation = result;
                 Product.get({id: $scope.allocation.product}, function(result2) {
                    $scope.product = result2;
                    var product=$scope.product;
                     product.isalloced=false;
                    //update the product
                    Product.update({id: product._id},product);
                    });
                $('#saveAllocationModal').modal('show');
            });
        };

        $scope.delete = function (id) {
            Allocation.get({id: id}, function(result) {
                $scope.allocation = result;
                $('#deleteAllocationConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id,allocation) {
            Allocation.delete({id: id},
                function () {
                    Product.get({id: allocation.product}, function(result2) {
                    $scope.product = result2;
                    var product= $scope.product;
                    product.isalloced=false;
                    //update the product
                    Product.update({id: product._id},product);
                    });

                     
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

        $scope.saveCalback = function () {
            $scope.loadAll();
            $('#saveAllocationModal').modal('hide');
              
            $scope.clear();
        };
        //  $scope.load = function (id) {
        // Product.get({id: id}, function(result) {
        // $scope.product = result;
        // });
        // };
       
        

    });


