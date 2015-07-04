'use strict';


angular
    .module('membershipApp')
    .controller('PersonSaveController', function ($scope, Person, ParseLinks, $stateParams, $timeout, $state) {

        $scope.isUpdate = !!($stateParams.id);

        $scope.success = null;
        $scope.error = null;
        $scope.doNotMatch = null;

        $scope.load = function (id) {
            Person.get({id: id}, function(result) {
              $scope.entity = result;
            });
        };

        $scope.save = function () {
            Person.update($scope.entity,
                function (data, responseHeaders) {
                    var person_id = ($scope.isUpdate) ? $stateParams.id : responseHeaders("Location").split('/').pop();
                    $state.go('personDetail', {id: person_id});
                });
        };


        $scope.clear = function () {
            $scope.entity = {id : null, login : null, email : null, barcode: null, cin: null, birthDay: null, gender: null, address: null, 
                zipCode: null, city: null, country: null, tel: null, description: null, archived: null, archivedCause: null };
            $scope.personFrom.$setPristine();
            $scope.personFrom.$setUntouched();

            if($scope.isUpdate){
                $scope.load($stateParams.id);
            }
        };

        $timeout($scope.clear);
        
    });
