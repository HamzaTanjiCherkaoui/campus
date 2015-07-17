'use strict';

angular.module('campusApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('reservation', {
                parent: 'entity',
                url: '/reservation',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'campusApp.reservation.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/reservation/reservations.html',
                        controller: 'ReservationController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('reservation');
                        return $translate.refresh();
                    }]
                }
            })
            .state('reservationDetail', {
                parent: 'entity',
                url: '/reservation/:id',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'campusApp.reservation.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/reservation/reservation-detail.html',
                        controller: 'ReservationDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('reservation');
                        return $translate.refresh();
                    }]
                }
            })
            .state('reservationSave', {
                parent: 'entity',
                url: '/reservation/save/:person/:id',
                data: {
                    roles: ['reservation.create'],
                    pageTitle: 'campusApp.reservation.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/reservation/reservation-save.html',
                        controller: 'ReservationSaveController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('reservation');
                        return $translate.refresh();
                    }]
                }
            });
    });
