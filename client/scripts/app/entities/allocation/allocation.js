'use strict';

angular.module('membershipApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('allocation', {
                parent: 'entity',
                url: '/allocation',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'membershipApp.allocation.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/allocation/allocations.html',
                        controller: 'AllocationController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('allocation');
                        return $translate.refresh();
                    }]
                }
            })
            .state('allocationDetail', {
                parent: 'entity',
                url: '/allocation/:id',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'membershipApp.allocation.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/allocation/allocation-detail.html',
                        controller: 'AllocationDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('allocation');
                        return $translate.refresh();
                    }]
                }
            });
    });
