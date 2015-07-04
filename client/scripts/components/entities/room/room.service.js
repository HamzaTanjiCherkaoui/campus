'use strict';

<<<<<<< HEAD
angular.module('jhipsterApp')
    .factory('Room', function ($resource) {
        return $resource('api/rooms/:id', {}, {
=======
angular.module('membershipApp')
    .factory('Person', function ($resource, $filter) {
        return $resource('http://127.0.0.1:9000/api/persons/:id', {}, {
>>>>>>> 607218600da378bbde6078f8fbae51bf6f74d73e
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
<<<<<<< HEAD
                    return data;
                }
            },
            'update': { method:'PUT' }
=======
                    data.birthDay = $filter("amDateFormat")(data.birthDay, 'YYYY-MM-D');
                    return data;
                }
            },
            'update': { method:'PUT' },
            'save': { method:'POST' }
>>>>>>> 607218600da378bbde6078f8fbae51bf6f74d73e
        });
    });
