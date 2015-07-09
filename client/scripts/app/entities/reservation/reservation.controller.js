'use strict';

angular.module('campusApp')
    .controller('ReservationController', function ($scope, Reservation, ParseLinks) {
        $scope.reservations = [];
        $scope.page = 1;
        $scope.loadAll = function() {
            Reservation.query({page: $scope.page, perPage: 20}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                $scope.reservations = result;
            });
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();

        $scope.create = function () {
            Reservation.update($scope.reservation,
                function () {
                    $scope.loadAll();
                    $('#saveReservationModal').modal('hide');
                    $scope.clear();
                });
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

        $scope.confirmDelete = function (id) {
            Reservation.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deleteReservationConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.clear = function () {
            $scope.reservation = {datePayement: null, dateFrom: null, dateTo: null, status: null, price: null, id: null};
            $scope.editForm.$setPristine();
            $scope.editForm.$setUntouched();
        };
    });
