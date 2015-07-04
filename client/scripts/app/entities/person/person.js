'use strict';

angular.module('membershipApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('person', {
                parent: 'entity',
                url: '/persons',
                data: {
                    roles: [],
                    pageTitle: 'membershipApp.person.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/person/persons.html',
                        controller: 'PersonController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('person');
                        return $translate.refresh();
                    }]
                }
            })
            .state('personDetail', {
                parent: 'entity',
                url: '/person/:id',
                data: {
                    roles: [],
                    pageTitle: 'membershipApp.person.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/person/person-detail.html',
                        controller: 'PersonDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('person');
                        return $translate.refresh();
                    }]
                }
            })
            .state('personSave', {
                parent: 'entity',
                url: '/person/save/:id',
                data: {
                    roles: [],
                    pageTitle: 'membershipApp.person.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/person/person-save.html',
                        controller: 'PersonSaveController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('person');
                        return $translate.refresh();
                    }]
                }
            });
    });
