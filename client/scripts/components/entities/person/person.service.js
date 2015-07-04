'use strict';

angular.module('membershipApp')
    .factory('Person', function ($resource) {
        return $resource('http://127.0.0.1:9000/api/persons/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    });
