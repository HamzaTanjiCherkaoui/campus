'use strict';

angular.module('campusApp')
    .controller('ReservationController', function ($scope, $http, Reservation, Fields) {
        $scope.reservations = [];
        $scope.searchData = {
            page: 1,
            perPage: 4,
            keyword : '',
            orderBy : 'datePayement',
            orderDir : 'asc'
        };
        $scope.fields = Fields.get('reservation');
        $scope.getFieldValue = Fields.getValue;

        $scope.loadAll = function() {
            Reservation.query($scope.searchData, function(result) {
                $scope.reservations = result;
            });
        };
        $scope.loadPage = function(page) {
            $scope.searchData.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();

        $scope.create = function () {
            var entity = $scope.reservation;
            entity.rooms = [];
            if(entity._id) {
                Reservation.update({id: entity._id}, entity, saveCalback);
            }
            else {
                Reservation.save(entity, saveCalback);
            }
        };

        $scope.update = function (id) {
            Reservation.get({id: id}, function(result) {
                $scope.reservation = result;
                $('#saveReservationModal').modal('show');
            });
        };

        $scope.delete = function (id) {
            Reservation.get({id: id}, function(result) {
                $scope.reservation = result;
                $('#deleteReservationConfirmation').modal('show');
            });
        };

        $scope.multipleDelete = function () {
            $http.post('/api/reservations/deletemultiple', {ids: getCheckedReservationsIDs()})
                .success(function () {
                    $('#deleteMultipleConfirmation').modal('hide');
                    $scope.loadAll();
                });
        };

        $scope.confirmDelete = function (id) {
            Reservation.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deleteReservationConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.changeOrder = function (column) {
            $scope.searchData.orderBy = column;
            $scope.searchData.orderDir = ($scope.searchData.orderDir === 'asc') ? 'desc' : 'asc';
            $scope.loadAll();
        };

        $scope.clear = function () {
            $scope.reservation = {_id: null, name: null, floors: null, type: null};
            $scope.editForm.$setPristine();
            $scope.editForm.$setUntouched();
        };       

        $scope.markAll = function (checked) {
            $scope.reservations.forEach(function (entity) {
                entity.checked = checked;
            });
        };

        $scope.showMultipleActions = function () {
            return getCheckedReservations().length === 0 ? false : true;
        };

        function getCheckedReservations () {
            return $scope.reservations.filter(function (entity) { return entity.checked;});
        }

        function getCheckedReservationsIDs () {
            return getCheckedReservations().map(function(entity){return entity._id;});
        }

        function saveCalback () {
            $scope.loadAll();
            $('#saveReservationModal').modal('hide');
            $scope.clear();
        }
    });