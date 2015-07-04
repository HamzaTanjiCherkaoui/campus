'use strict';

angular.module('membershipApp')
    .factory('User', function ($resource) {
        return $resource('api/users/:id', {}, {
                'query': {method: 'GET', isArray: true},
                'get': {
                    method: 'GET',
                    transformResponse: function (data) {
                        data = angular.fromJson(data);
                        // var birthDayFrom = data.birthDay.split("-");
                        // data.birthDay = new Date(new Date(birthDayFrom[0], birthDayFrom[1] - 1, birthDayFrom[2]));
                        return data;
                    }
                },
                'update': { method:'PUT' }
            });
        })
    .factory('UserPassword', function ($resource) {
        return $resource('api/users/change_password', {}, {});
    })
    .factory('UserActivate', function ($resource) {
        return $resource('api/users/activate/:activated/:ids', {}, {});
    });
