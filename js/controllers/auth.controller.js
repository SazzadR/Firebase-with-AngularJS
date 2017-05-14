'use strict';

angularApp.controller('AuthCtrl', ['$scope', '$log', 'AuthFactory', function ($scope, $log, AuthFactory) {
    var vm = this;

    vm.register = function () {
        AuthFactory.register(vm.user);
    };

    vm.login = function () {
        AuthFactory.login(vm.user);
    };

    $scope.logout = function () {
        AuthFactory.logout();
    };
}]);
