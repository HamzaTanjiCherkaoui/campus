'use strict';

angular.module('membershipApp')
    .factory('Product', function ($resource, $filter) {
        return $resource('http://127.0.0.1:9000/api/products/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                
                
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'update': { method:'PUT' },
            'save': { method:'POST' }
        });
    });
