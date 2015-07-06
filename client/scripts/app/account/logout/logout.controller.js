'use strict';

angular.module('membershipApp')
    .controller('LogoutController', function ($state, Auth) {
        Auth.logout();
        $state.go('login');
    });
