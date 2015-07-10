'use strict';


angular
    .module('campusApp')
    .controller('UserController', function ($scope, $http, User, ParseLinks, Activate, Fields) {
        $scope.users = [];
        $scope.pagination = {};
        $scope.searchData = {
            page: 1,
            perPage: 4,
            keyword : '',
            orderBy : 'username',
            orderDir : 'asc'
        };
        $scope.fields = Fields.get('user');
        $scope.getFieldValue = Fields.getValue;

        $scope.loadAll = function() {
            User.query($scope.searchData, function(result, headers) {
                $scope.users = result;
                var pages = headers('pages');
                $scope.pagination.first = 1;
                $scope.pagination.prev = ($scope.searchData.page > 1 ) ? $scope.searchData.page - 1 : 0;
                $scope.pagination.next = ($scope.searchData.page + 1 <= pages ) ? $scope.searchData.page + 1 : 0;
                $scope.pagination.last = pages;
                $scope.allChecked = false;
            });
        };
        $scope.loadPage = function(page) {
            $scope.searchData.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();

        $scope.delete = function (id) {
            User.get({id: id}, function(result) {
                $scope.user = result;
                $('#deleteUserConfirmation').modal('show');
            });
        };

        $scope.multipleDelete = function () {
            console.log(getCheckedUsersIDs());
            $http.post('/api/users/deletemultiple', {ids: getCheckedUsersIDs()})
                .success(function () {
                    $('#deleteMultipleConfirmation').modal('hide');
                    $scope.loadAll();
                });
        };

        $scope.confirmDelete = function (id) {
            User.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deleteUserConfirmation').modal('hide');
                });
        };

        $scope.activate = function (state) {
            Activate.save({activated: state}, {ids: getCheckedUsersIDs()}, function(){
                $('#deleteMultipleConfirmation').modal('hide');
                $scope.loadAll();
            });
        };

        $scope.markAll = function (checked) {
            $scope.users.forEach(function (entity) {
                entity.checked = checked;
            });
        };    

        $scope.changeOrder = function (column) {
            $scope.searchData.orderBy = column;
            $scope.searchData.orderDir = ($scope.searchData.orderDir === 'asc') ? 'desc' : 'asc';
        };

        $scope.clear = function () {
            $scope.user = {name: null, type: null, id: null};
        };

        function getCheckedUsers () {
            return $scope.users.filter(function (entity) { return entity.checked;});
        }
        function getCheckedUsersIDs () {
            return getCheckedUsers().map(function(entity){return entity._id;});
        }

        $scope.showMultipleActions = function () {
            return getCheckedUsers().length === 0 ? false : true;
        };
        
        $scope.showSwitchAction = function () {
            return getCheckedUsers().length === 2 ? true : false;
        };

        $scope.authorize = function () {
            var table = $scope.authorities.table;
            var actions = $scope.authorities.action; 
            var authorities = [];
            $.each(Object.keys(actions), function(key, value){if(actions[value]) authorities.push(table + '.' + value);});

            $http.post('/api/users/authorize', {ids: getCheckedUsersIDs(), roles: authorities})
                .success(function () {
                    $('#authoritiesModal').modal('hide');
                    $scope.loadAll();
                });
        };
    });
