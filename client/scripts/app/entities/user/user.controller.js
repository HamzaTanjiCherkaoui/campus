'use strict';


angular
    .module('campusApp')
    .controller('UserController', function ($scope, User, ParseLinks, UserActivate) {
        $scope.users = [];
        $scope.searchData = {
            page: 1,
            perPage: 5,
            keyword : '',
            orderBy : 'username',
            order : 'ASC'
        };
        $scope.loadAll = function() {
            console.log($scope.searchData);
            User.query($scope.searchData, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                $scope.users = result;//.filter(function(item){return ['anonymousUser', 'system'].indexOf(item.login) == -1 ; });
                $scope.users.forEach(function(entity){
                    entity.checked = false;
                });
            });
        };
        $scope.loadPage = function(page) {
            $scope.searchData.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();

        $scope.delete = function (id) {
            User.get({id: id}, function(result) {
                $scope.entity = result;
                $('#deleteUserConfirmation').modal('show');
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
            var ids = [];
            $scope.users.filter(function (entity) { return entity.checked;})
                .forEach(function (entity) { ids.push(entity.id); });
            UserActivate.get({activated: state, ids: ids.join(',')});
        };

        $scope.markAll = function (checked) {
            $scope.users.forEach(function (entity) {
                entity.checked = checked;
            });
        };
    });
