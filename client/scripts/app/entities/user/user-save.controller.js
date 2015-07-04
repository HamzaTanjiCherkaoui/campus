'use strict';


angular
    .module('membershipApp')
    .controller('UserSaveController', function ($scope, User, ParseLinks, $stateParams, $timeout, $state, UserPassword) {

        $scope.isUpdate = !!($stateParams.id);

        $scope.success = null;
        $scope.error = null;
        $scope.doNotMatch = null;

        $scope.load = function (id) {
            User.get({id: id}, function(result) {
              $scope.entity = result;
            });
        };

        $scope.save = function () {
            $scope.entity.password = Math.random().toString(36);
            User.update($scope.entity,
                function (data, responseHeaders) {
                    var userId = ($scope.isUpdate) ? $stateParams.id : responseHeaders('Location').split('/').pop();
                    $state.go('userDetail', {id: userId});
                });
        };

        $scope.changePassword = function () {
            if ($scope.password !== $scope.confirmPassword) {
                $scope.doNotMatch = 'ERROR';
            } else {
                $scope.doNotMatch = null;
                UserPassword.save({id: $scope.entity.id, password : $scope.password}, function () {
                    $scope.error = null;
                    $scope.success = 'OK';
                }, function () {
                    $scope.success = null;
                    $scope.error = 'ERROR';
                });
            }
        };


        $scope.clear = function () {
            $scope.entity = {id : null, login : null, email : null, barcode: null, cin: null, birthDay: null, gender: null, address: null, zipCode: null, city: null, country: null, job: null, tel: null, gsm: null, certificat: null, expertise: null, description: null, website: null, facebook: null, google: null, twitter: null, paymentFrequency: null, paymentMethod: null, paymentAmount: null, archived: null, archivedCause: null };
            $scope.editForm.$setPristine();
            $scope.editForm.$setUntouched();

            $scope.changePasswordForm.$setPristine();
            $scope.changePasswordForm.$setUntouched();

            if($scope.isUpdate){
                $scope.load($stateParams.id);
            }
        };

        $timeout($scope.clear);
        
    });
