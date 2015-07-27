'use strict';

angular.module('campusApp')
    .controller('ProductController', function ($http,$scope, Product ,Category ,Allocation,Person,Fields) {
       $scope.products = [];
       $scope.products =[ {
        checked:false
       }];
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

        if($scope.searchData.category === null)    {
            $scope.searchData.category = '';
        }
            
        Product.query($scope.searchData, function(result, headers) {
            $scope.products = result;
            var pages = headers('pages');
            $scope.pagination.first = 1;
            $scope.pagination.prev = ($scope.searchData.page > 1 ) ? $scope.searchData.page - 1 : 0;
            $scope.pagination.next = ($scope.searchData.page + 1 <= pages ) ? $scope.searchData.page + 1 : 0;
            $scope.pagination.last = pages;
            
            $scope.fields = Fields.get('product');
            $scope.getFieldValue = Fields.getValue;
        });
            
            
        };
        $scope.loadPage = function(page) {
            $scope.searchData.page = page;
            $scope.loadAll();
            $scope.allChecked=false;
                
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
         $scope.multipleDelete=function  () {
            $scope.deleteProducts=getCheckedProductsIDs();
            $http.post('/api/products/deletemultiple',$scope.deleteProducts, function  () {
                
            }); 
            $('#deleteMultipleProductConfirmation').modal('hide');            
            $scope.loadAll();
         }; 

         $scope.allocatemodal = function () {
            $scope.persons = [];
            $scope.pagination = {};
            $scope.searchData = {
            page: 1,
            perPage: 4,
            keyword : '',
            orderBy : 'lastName',
            orderDir : 'asc'
        };
          
                Person.query($scope.searchData, function(result) {
                $scope.persons = result;
                 $('#allocmodal').modal('show');
            });
               
            
        };


        $scope.allocate=function  () {

            $scope.productsToAllocate = getCheckedProductsIDs();
           // get the person Id from the modal 
            var personId=$scope.person;
            
            //loop trought the selected products 
            $scope.productsToAllocate.forEach(function (product) {
                var productId=product;
                var allocation = new Allocation();
                allocation.type=true;
                allocation.status=true;
                allocation.person=personId;
                allocation.product=productId;
                console.log(allocation);
                Allocation.save(allocation);
            });
            //save the allocation 

            $scope.clear();            
            $('#allocmodal').modal('hide');            
            
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

        function getCheckedProductsIDs () {
            return $scope.products.filter(function (entity) { return entity.checked;}).map(function(entity){return entity._id;});
        }

        $scope.showMultipleActions= function () {
            
            return $scope.products.filter(function (entity) { return entity.checked;}).length === 0 ? false : true;
        };


       
    });
