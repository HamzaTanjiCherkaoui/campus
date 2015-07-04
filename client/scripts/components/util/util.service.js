'use strict';

angular.module('membershipApp')
    .factory('Printer', ['$window', function($window) {
        return {
            print: function() {
	            $window.print();
	        }
        };
    }]);