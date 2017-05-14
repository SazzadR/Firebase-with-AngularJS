'use strict';

var angularApp = angular.module('angularApp', ['ngRoute', 'ngAnimate', 'angular-loading-bar', 'firebase']);

angularApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/login', {
            templateUrl: 'views/login.html',
            controller: 'AuthCtrl',
            controllerAs: 'vm',
            requireLogout: true
        }).
        when('/register', {
            templateUrl: 'views/register.html',
            controller: 'AuthCtrl',
            controllerAs: 'vm',
            requireLogout: true
        }).
        when('/success', {
            templateUrl: 'views/success.html',
            controller: 'SuccessCtrl',
            controllerAs: 'vm',
            authenticated: true
        }).
        otherwise({
            redirectTo: '/login'
        });

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDDhN0DNf29Yqdz3Lv-oa02t06BcuxQcas",
        authDomain: "ng-lynda.firebaseapp.com",
        databaseURL: "https://ng-lynda.firebaseio.com",
        projectId: "ng-lynda",
        storageBucket: "ng-lynda.appspot.com",
        messagingSenderId: "669995550445"
    };

    firebase.initializeApp(config);
}]);

angularApp.run(['$rootScope', '$location', 'AuthFactory', function ($rootScope, $location, AuthFactory) {
    $rootScope.$on('$routeChangeStart', function (event, next) {
        if (angular.isDefined(next.$$route)) {
            if (next.$$route.authenticated === true) {
                if (!AuthFactory.isLoggedIn()) {
                    $location.path('/login');
                } else {
                    $location.path('/success');
                }
            }

            if (next.$$route.requireLogout === true) {
                if (AuthFactory.isLoggedIn()) {
                    $location.path('/success');
                }
            }
        }
    });
}]);
