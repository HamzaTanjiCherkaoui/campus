'use strict';

angular.module('membershipApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('category', {
                parent: 'entity',
                url: '/categories',
                data: {
                    roles: [],
                    pageTitle: 'membershipApp.category.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/category/categories.html',
                        controller: 'CategoryController'
                    }
                },
               
            })
            .state('categoryDetail', {
                parent: 'entity',
                url: '/category/:id',
                data: {
                    roles: [],
                    pageTitle: 'membershipApp.category.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/category/category-detail.html',
                        controller: 'CategoryDetailController'
                    }
                },
               
            })
            .state('categorySave', {
                parent: 'entity',
                url: '/category/save/:id',
                data: {
                    roles: [],
                    pageTitle: 'membershipApp.category.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/category/category-save.html',
                        controller: 'CategorySaveController'
                    }
                },
               
            });
    });
