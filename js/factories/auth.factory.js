'use strict';

angularApp.factory('AuthFactory', ['$rootScope', '$location', '$log', '$firebaseAuth', '$firebaseArray', function ($rootScope, $location, $log, $firebaseAuth, $firebaseArray) {
    var authObj = $firebaseAuth();

    return {
        register: register,
        login: login,
        logout: logout,
        isLoggedIn: isLoggedIn
    };

    function register(user) {
        authObj.$createUserWithEmailAndPassword(user.email, user.password).then(function (userData) {
            // $log.log(userData);
            $rootScope.message = 'Hi ' + user.firstName + ', Thanks for registering.';
            $rootScope.errorMessage = false;

            var dbRef = firebase.database().ref('users').child(userData.uid).set({
                time: new Date().getTime(),
                userId: userData.uid,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }).then(function (ref) {
                //
            });

            $rootScope.errorMessage = false;
            $location.path('/success');
        }).catch(function (error) {
            $log.log(error);
            $rootScope.message = error.message;
            $rootScope.errorMessage = true;
        });
    }

    function login(user) {
        authObj.$signInWithEmailAndPassword(user.email, user.password).then(function (authData) {
            // $log.log(authData);
            $rootScope.errorMessage = false;

            $location.path('/success');
        }).catch(function (error) {
            $log.log(error);
            $rootScope.message = error.message;
            $rootScope.errorMessage = true;
        });
    }

    function logout() {
        authObj.$signOut();
        $rootScope.currentUser = null;
        $rootScope.message = null;
    }

    function isLoggedIn() {
        var authData = authObj.$getAuth()
        if (authData) {
            var dbRef = firebase.database().ref('users');
            var dbRecord = $firebaseArray(dbRef);

            dbRecord.$loaded().then(function (response) {
                // $log.log(response.$getRecord(authData.uid));
                $rootScope.currentUser = response.$getRecord(authData.uid);
            });

            return true;
        } else {
            return false;
        }


        /*firebase.auth().onAuthStateChanged(function (authData) {
            if (authData) {
                var dbRef = firebase.database().ref('users');
                var dbRecord = $firebaseArray(dbRef);

                dbRecord.$loaded().then(function (response) {
                    // $log.log(response.$getRecord(authData.uid));
                    $rootScope.currentUser = response.$getRecord(authData.uid);
                });

                return true;
            } else {
                return false;
            }
        });*/
    }
}]);
